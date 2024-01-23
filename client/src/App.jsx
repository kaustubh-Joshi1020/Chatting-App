import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client";
 
const App = ()=> {
 
  // const socket = io("http://localhost:8000")
  const socket = useMemo(()=> io("http://localhost:8000"),[])
 
  useEffect(()=>{
    socket.on("connect" , ()=>{
      console.log("connected : " + socket.id)
    })

    socket.on("received-msg" , (message)=>{
      console.log(message)
    })

  return () =>{
    socket.disconnect()
  }
  },[])

const[message , setmessage] = useState("");

const handleSubmit = (e) =>{
  e.preventDefault();
  socket.emit("message" , message)
  setmessage("");
}

const handlemessage = (e) =>{
  e.preventDefault();
  setmessage(e.target.value)
}

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text"
        onChange={handlemessage}
        value={message} name="" id="" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App;


// without using useMemo hook, use useRef() instead. also stops rerendering of components
// const socket = io("http://localhost:8000")

// const inputref = useRef();
// let message;
// const handleSubmit = (e) =>{
//   e.preventDefault();
//   message = inputref.current.value;
//   socket.emit("message" , message)
//   inputref.current.value = "";

/* <input type="text"
        // onChange={handlemessage}
        ref={inputref}/> */
// }