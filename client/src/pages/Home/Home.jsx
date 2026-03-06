import Input from "../../components/Input/Input";
import Downloadbox from "../../components/Downloadbox/Downloadbox";
import Status from "../../components/Status/Status";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/Progress/ProgressBar";
import { toast } from "react-toastify";
import { createPeer } from "../../webrtc/createPeer";
const CHUNK_SIZE = 64 * 1024;
const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3001";
const Home = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const pc = useRef(null);
  const dc = useRef(null);
  const ws = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      ws.current?.close();
      pc.current?.close();
    };
  }, []);

  function reset() {
    ws.current?.close();
    pc.current?.close();
    dc.current?.close?.();

    ws.current = null;
    pc.current = null;
    dc.current = null;

    setStatus("");
    setLink("");
    setProgress(0);
    setFile(null);
  }
  useEffect(() => {
    if (!file) return;
    reset();
  }, [file]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setStatus("idle");
    setFile(file);
    setLink("");
    setProgress(0);
  }

  async function handleCreateRoom() {
    try {
      if (!file) {
        toast("Please select a file first");
        return;
      }
      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        ws.current.send(
          JSON.stringify({
            type: "create-room",
            fileName: file.name,
            fileSize: file.size,
          }),
        );
      };

      ws.current.onmessage = async (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === "room-created") {
          const createdLink = `${window.location.origin}/download/${msg.roomId}`;
          setLink(createdLink);
          setStatus("waiting");
        }
        if (msg.type === "receiver-joined") {
          setStatus("connecting");
          await peerConnection();
        }
        if (msg.type === "answer") {
          setStatus("answer-received");
          await pc.current.setRemoteDescription(
            new RTCSessionDescription(msg.sdp),
          );
        }
        if (msg.type === "ice-candidate") {
          await pc.current.addIceCandidate(new RTCIceCandidate(msg.candidate));
        }
        if (msg.type === "peer-disconnected") {
          setStatus("idle");
        }
        if (msg.type === "file-requested") {
          setStatus("sending");
          sendFile();
        }
      };
    } catch (err) {
      // console.log(err);
    }
  }

  async function peerConnection() {
    if (pc.current) {
      pc.current.close();
    }
    pc.current = createPeer();
    pc.current.oniceconnectionstatechange = () => {
      const st = pc.current.iceConnectionState;
      console.log("ICE state:", st);
      if ((st === "failed" || st === "disconnected") && status !== "done") {
        toast.error("Unable to establish peer connection.");
        reset()
      }
    };
    dc.current = pc.current.createDataChannel("file", {
      ordered: true,
      // maxRetransmits: 0,
    });
    dc.current.binaryType = "arraybuffer";
    dc.current.onopen = () => {
      setStatus("connected");
    };
    pc.current.onicecandidate = async (e) => {
      if (e.candidate) {
        ws.current.send(
          JSON.stringify({ type: "ice-candidate", candidate: e.candidate }),
        );
      }
    };
    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    setStatus("offer-sent");
    ws.current.send(JSON.stringify({ type: "offer", sdp: offer }));
  }

  //Old
  // function sendFile() {
  //   const reader = new FileReader();
  //   let offset = 0;
  //   reader.onload = (e) => {
  //     if (dc.current.bufferedAmount > CHUNK_SIZE * 4) {
  //       setTimeout(() => reader.onload(e), 50);
  //       return;
  //     }
  //     dc.current.send(e.target.result);
  //     offset += e.target.result.byteLength;
  //     setProgress(Math.floor((offset / file.size) * 100));
  //     if (offset < file.size) {
  //       readSlice(offset);
  //     } else {
  //       setStatus("done");
  //       ws.current.close();
  //     }
  //   };
  //   function readSlice(o) {
  //     const slice = file.slice(o, o + CHUNK_SIZE);
  //     reader.readAsArrayBuffer(slice);
  //   }

  //   readSlice(0);
  // }
  // New
  function sendFile() {
    const reader = new FileReader();
    let offset = 0;

    dc.current.bufferedAmountLowThreshold = CHUNK_SIZE * 2;

    reader.onload = (e) => {
      dc.current.send(e.target.result);

      offset += e.target.result.byteLength;

      setProgress(Math.floor((offset / file.size) * 100));

      if (offset < file.size) {
        if (dc.current.bufferedAmount > CHUNK_SIZE * 4) {
          dc.current.onbufferedamountlow = () => {
            dc.current.onbufferedamountlow = null;
            readSlice(offset);
          };
        } else {
          readSlice(offset);
        }
      } else {
        setStatus("done");
      }
    };

    function readSlice(o) {
      const slice = file.slice(o, o + CHUNK_SIZE);
      reader.readAsArrayBuffer(slice);
    }

    readSlice(0);
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 pb-10 pt-6">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl border border-cyan-500/15 bg-slate-950/80 p-6 shadow-[0_0_50px_rgba(15,23,42,0.9)] backdrop-blur-xl md:flex-row md:items-stretch md:gap-14 md:p-10">
        {status && <Status status={status} />}

        <div className="flex w-full items-center justify-center mt-12 md:mt-0 md:w-1/2">
          {file ? (
            <Downloadbox
              setStatus={setStatus}
              link={link}
              setFile={setFile}
              handleCreateLink={handleCreateRoom}
              file={file}
            />
          ) : (
            <Input setStatus={setStatus} handleFile={handleFileChange} />
          )}
        </div>
        <div className="flex w-full flex-1 flex-col gap-4 text-slate-100">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Share files <span className="text-cyan-300">directly</span> from
              your device.
            </h2>
            <p className="text-base font-medium text-slate-300/90 md:text-lg">
              Create a secure link and send any file size peer‑to‑peer. All
              transfers happen in real time between devices — nothing is stored
              on a server.
            </p>
          </div>
          {progress > 0 && status && (
            <div className="rounded-2xl bg-slate-900/80 p-4">
              <ProgressBar value={progress} label="Transfer Progress" />
            </div>
          )}
          <div className="mt-2 space-y-2 rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
            <p className="font-semibold text-cyan-300">Heads up</p>
            <p>
              If you close this page your share will stop. Just keep the tab
              open in the background until your transfer is finished.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
