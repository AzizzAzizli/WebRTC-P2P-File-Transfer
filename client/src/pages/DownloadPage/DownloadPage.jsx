import { useState } from "react";
import Receive from "../../components/ReceiveBox/Receive";
import Status from "../../components/Status/Status";
import ProgressBar from "../../components/Progress/ProgressBar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRef } from "react";
import { formatBytes } from "../../shared/utils";
import { createPeer } from "../../webrtc/createPeer";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3001";

const DownloadPage = () => {
  const { roomId } = useParams();
  const [status, setStatus] = useState("connecting");
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const ws = useRef(null);
  const pc = useRef(null);
  const receivedChunks = useRef([]);
  const fileMetadata = useRef(null);

  useEffect(() => {
    if (status === "error") {
      toast.error("Connection error occurred");
    }
  }, [status]);

  useEffect(() => {
    socketConnection();
  }, [roomId]);

  function socketConnection() {
    ws.current = new WebSocket(WS_URL);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: "join-room", roomId }));
    };
    ws.current.onmessage = async (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "room-joined") {
        setFileInfo({ name: msg.fileName, size: msg.fileSize });
        fileMetadata.current = { name: msg.fileName, size: msg.fileSize };
        setStatus("ready");
      }
      if (msg.type === "offer") {
        setStatus("connecting-peer");
        await setupPeerConnection(msg.sdp);
      }
      if (msg.type === "ice-candidate") {
        await pc.current.addIceCandidate(new RTCIceCandidate(msg.candidate));
      }
      if (msg.type === "peer-disconnected") {
        setStatus("error");
      }
      if (msg.type === "error") {
        setStatus("error");
      }
    };
  }
  async function setupPeerConnection(sdpOffer) {
    try {
      pc.current = createPeer();
      pc.current.ondatachannel = (e) => {

        const channel = e.channel;
        channel.binaryType = "arraybuffer";
        channel.onopen = () => {
          setStatus("awaiting-data");
        };
        channel.onmessage = (e) => {
          setStatus("receiving");

          receivedChunks.current.push(e.data);
          const received = receivedChunks.current.reduce(
            (acc, curr) => acc + curr.byteLength,
            0,
          );
          setProgress(Math.floor((received / fileMetadata.current.size) * 100));
          if (received >= fileMetadata.current.size) {
            const blob = new Blob(receivedChunks.current);
            setDownloadUrl(URL.createObjectURL(blob));
            setStatus("done");
            ws.current.close();
          }
        };
      };
      pc.current.onicecandidate = (e) => {
        if (e.candidate) {
          ws.current.send(
            JSON.stringify({ type: "ice-candidate", candidate: e.candidate }),
          );
        }
      };
      await pc.current.setRemoteDescription(
        new RTCSessionDescription(sdpOffer),
      );
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      setStatus("answering-peer");
      ws.current.send(JSON.stringify({ type: "answer", sdp: answer }));
    } catch (err) {
      // console.log(err);
    }
  }

  function requestFile() {
    ws.current.send(JSON.stringify({ type: "request-file", roomId }));
    setStatus("waiting-offer");
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 pb-10 pt-6">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl border border-cyan-500/15 bg-slate-950/80 p-6 shadow-[0_0_50px_rgba(15,23,42,0.9)] backdrop-blur-xl md:flex-row md:items-stretch md:gap-14 md:p-10">
        {status && <Status status={status} />}
        <div className="flex w-full justify-center items-center mt-12 md:mt-0 md:w-1/2">
          {downloadUrl ? (
            <Receive file={fileInfo} url={downloadUrl} />
          ) : (
            <div className="flex h-[260px] w-full max-w-[260px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-cyan-500/40 bg-slate-900/80 px-4 text-center text-slate-50 sm:max-w-[280px] md:max-w-[320px]">
              <p className="text-sm font-semibold text-cyan-200">
                {fileInfo?.name || "Waiting for the sender to start sharing..."}
              </p>
              <p className="text-xs text-slate-100/80">
                {formatBytes(fileInfo?.size) ||
                  "Keep this page open; once the connection is ready your files will appear here automatically."}
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col gap-4 text-slate-100">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Receive files securely, in real time.
            </h2>
            <p className="text-base font-medium text-slate-300/90 md:text-lg">
              When the sender starts sharing, the file is streamed directly to
              your browser. Nothing is stored on a server — the transfer is
              strictly peer‑to‑peer.
            </p>
          </div>
          {progress > 0 && (
            <div className="rounded-2xl bg-slate-900/80 p-4">
              <ProgressBar value={progress} label="Download Progress" />
            </div>
          )}
          <div className="mt-3 space-y-2 rounded-2xl border border-cyan-500/25 bg-slate-900/80 p-4 text-sm">
            <div className="mb-1 flex items-center justify-between text-xs font-mono uppercase tracking-[0.22em] text-cyan-300">
              <span>Status</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.9)] ${
                  downloadUrl ? "bg-emerald-400" : "bg-yellow-300"
                }`}
              />
            </div>
            <p className="text-slate-100">
              {downloadUrl
                ? "File is ready. You can safely download it now."
                : "Waiting for the sender to connect and start sharing the file."}
            </p>
            <p className="text-xs text-slate-400">
              Keep this tab open. The connection between you and the sender is
              established directly using WebRTC.
            </p>
          </div>
          {receivedChunks.current.length === 0 && (
            <button
              type="button"
              onClick={requestFile}
              className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[#284B63] px-5 py-2.5 text-sm font-semibold text-[#F4F9E9] shadow-sm transition hover:-translate-y-[1px] hover:bg-[#1f3b4d] hover:shadow-md"
            >
              Get files
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
