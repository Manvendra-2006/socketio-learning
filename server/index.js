import express from 'express'
import { Server } from 'socket.io';
import {createServer} from "http"
import cors from 'cors'
const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}))
const server  = createServer(app)
const io = new Server(server,{
    cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials:true
  }
})
io.on("connection",(socket)=>{
    console.log("User is Connected")
    console.log("ID",socket.id)
    socket.emit("Welcome","Welcome to the server")
    socket.broadcast.emit("Welcome","Welcome to the server");
})
server.listen(3000,()=>{ // Here we write server instead of app because Socket.io server is built on HTTP server and if we write app.listen then it internally create one more HTTP server which is connected but we want a http server to connect which is attach to Socket..io 
    console.log("Server is running on Port 3000");
})