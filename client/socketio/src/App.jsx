import React from 'react'
import { useEffect } from 'react'
import {io} from "socket.io-client"
const App = () => {
  const socket = io("http://localhost:3000/")

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("coonected",socket.id)
    })
    socket.on("Welcome",(s)=>{
      console.log(s)
    })
  },[])
  return (
    <div>
      
    </div>
  )
}

export default App