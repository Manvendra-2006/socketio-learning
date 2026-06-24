import express from 'express'
import { Server } from 'socket.io';
import {createServer} from "http"
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
const server  = createServer(app)
const io = new Server(server,{
    cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials:true
  }
})
io.use((socket,next)=>{ // middleware
    console.log(socket)
    next() // after this io.on code will run otherwise not 
})
io.on("connection",(socket)=>{
    console.log("User is Connected")
    console.log("ID",socket.id)
    socket.broadcast.emit("Welcome",`User conneted ${socket.id}`)    
    socket.on("message",(data)=>{
        console.log(data);
        // socket.broadcast.emit("message",data) // This will send data to other except itself
        io.to(data.room).emit("message",data.message)
    })
    socket.on("disconnect",(s)=>{
        console.log(s)
    })
    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(room)
    })
})
app.get("/",(req,resp)=>{
    resp.send("Hello World")
})
app.get("/login",(req,resp)=>{
    const token = jwt.sign(
        {_id:"oidndkokdowmdw"},
       " 12222"
    )
    resp.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"}).json({
        message:"Login Successfully"
    })
})
server.listen(3000,()=>{ // Here we write server instead of app because Socket.io server is built on HTTP server and if we write app.listen then it internally create one more HTTP server which is connected but we want a http server to connect which is attach to Socket..io 
    console.log("Server is running on Port 3000");
})