import { WebSocketServer } from "ws";
import {randomUUID} from 'crypto';
import { createServer } from "http";
const server = createServer()
const wss = new WebSocketServer({server});
const rooms = new Map();


wss.on("connection",(ws)=>{

console.log(ws);




})









server.listen(3001,()=> console.log('server running'))



