import { WebSocketServer } from "ws";
import { randomUUID } from "crypto";
import { createServer } from "http";
import { json } from "stream/consumers";
const server = createServer();
const wss = new WebSocketServer({ server });
const rooms = new Map();

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    let data = JSON.parse(msg);

    switch (data.type) {
      case "create-room": {
        const roomId = randomUUID();
        rooms.set(roomId, {
          sender: ws,
          receiver: null,
          fileName: data.fileName,
          fileSize: data.fileSize,
        });
        ws.roomId = roomId;
        ws.role = "sender";
        ws.send(JSON.stringify({ type: "room-created", roomId }));
        // console.log(data);

        break;
      }
      case "join-room": {
        const room = rooms.get(data.roomId);
        if (!room) {
          ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
          return;
        }
        if (room.receiver) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Room already has a receiver",
            }),
          );
          return;
        }
        room.receiver = ws;
        ws.role = "receiver";
        ws.roomId = data.roomId;

        ws.send(
          JSON.stringify({
            type: "Joined-room",
            fileName: room.fileName,
            fileSize: room.fileSize,
          }),
        );

        break;
      }
      case "request-file": {
        const room = rooms.get(data.roomId);
        if (!room) {
          ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
          return;
        }
        room.sender.send(JSON.stringify({ type: "file-requested" }));
        break;
      }
      case "offer":
      case "answer":
      case "ice-candidate": {
        const room = rooms.get(data.roomId);
        if (!room) {
          ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
          return;
        }
        const target = ws.role === "sender" ? room.receiver : room.sender;
        if (target.readyState === 1) {
          target.send(JSON.stringify(data));
        }
        break;
      }
    }
  });
  ws.on("close", () => {
    if (ws.roomId) return;
    const room = rooms.get(ws.roomId);
    if (!room) return;
    const other = ws.role === "sender" ? room.receiver : room.sender;
    other?.send(JSON.stringify({ type: "peer-disconnected" }));

    rooms.delete(ws.roomId);
  });
  ws.on("error", (err) => console.error("WS hata:", err.message));
});

server.listen(3001, () => console.log("server running"));
