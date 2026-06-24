import React from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { io } from "socket.io-client"
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000/"), []) // Here Usememo prevent from creating multiple socket on render 
  const [message, setmessage] = useState('')
  const [room,setroom]= useState("")
  const [hello,sethello] = useState("")
   const [socketId,setsocketId] = useState("")
   const  [roomName,setroomName] = useState("")
  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message", {message,room})
  }
  function handleRoom(e){
    e.preventDefault()
    socket.emit("join-room",roomName)
    setroomName(" ")
  }
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id)
      setsocketId(socket.id)
    })
    socket.on("Welcome", (s) => {
      console.log(s)
    })
  //    if (room) {
  //   socket.emit("join-room", room);
  // }
    socket.on("message", (s) => {
      console.log(s)
      sethello(s)
    })
    return () => {
      console.log("CleanUp")
      socket.disconnect()
    }
  }, [])
  return (
    <div>
      <h1>Welcome to the Socket Io</h1>
      <h1>{socketId}</h1>
      <form action="" onSubmit={handleRoom}>
        <label>RoomName</label>
        <input type="text" placeholder="enter text" value={roomName} onChange={(event)=>setroomName(event.target.value)}/>
        <button>Join</button>
      </form>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Enter Text" />
        <input type="text"  value={room} onChange={(e)=>setroom(e.target.value)}/>
        <h1>{hello}</h1>
        <button>Send</button>
      </form>
    </div>
  )
}

export default App