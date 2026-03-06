const Status = ({ status }) => {
  const statusMessages = {
    idle: "Ready to share",
    waiting: "Waiting for connection",
    connecting: "Connecting to receiver",
    "offer-sent": "Offer sent, waiting for answer",
    "answer-received": "Answer received, establishing connection",
    "connecting-peer": "Setting up peer connection",
    "answering-peer": "Answering peer connection",
    connected: "Connected & ready",
    sending: "Transferring file",
    ready: "Ready to receive",
    "waiting-offer": "Waiting for sender's offer",
    "awaiting-data": "Channel opened and awaiting your get command",
    receiving: "Receiving file",
    done: "Transfer complete",
    error: "Connection error",
  };

  const getMessage = (status) => statusMessages[status] || "Unknown";

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 flex items-center gap-3 rounded-full bg-slate-900/90 border border-slate-700/60 px-4 py-2 backdrop-blur-sm z-10">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          status === "idle"
            ? "bg-yellow-500"
            : status === "waiting" ||
                status === "offer-sent" ||
                status === "answer-received"
              ? "bg-blue-500 animate-pulse"
              : status === "connecting" ||
                  status === "connecting-peer" ||
                  status === "answering-peer"
                ? "bg-violet-500 animate-pulse"
                : status === "ready"
                  ? "bg-green-500"
                  : status === "waiting-offer" || status === "awaiting-data"
                    ? "bg-orange-500 animate-pulse"
                    : status === "connected"
                      ? "bg-green-500 animate-pulse"
                      : status === "receiving"
                        ? "bg-cyan-500 animate-pulse"
                        : status === "sending"
                          ? "bg-cyan-500 animate-pulse"
                          : status === "done"
                            ? "bg-emerald-500"
                            : status === "error"
                              ? "bg-red-500 animate-pulse"
                              : "bg-gray-500"
        }`}
      ></span>
      <p className="text-xs font-medium text-cyan-300 whitespace-nowrap">
        {getMessage(status)}
      </p>
    </div>
  );
};

export default Status;
