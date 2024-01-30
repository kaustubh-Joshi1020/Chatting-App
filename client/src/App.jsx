  import React, { useEffect, useMemo, useState} from 'react'
import { io } from "socket.io-client";
import "./App.css";

const App = () => {

  // const socket = io("http://localhost:8000")
  // const[sendMessages , setsendMessages] = useState([]);
  // const[receivedMessages , setreceivedMessages] = useState([]);
  const socket = useMemo(() => io("http://localhost:8000"), [])
  const [socketid, setsocketid] = useState("") // used to display socket id
  const [message, setmessage] = useState("");
  const [room, setroom] = useState("");
  const [allMessages, setallMessages] = useState([]);
  const [Group, setGroup] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected : " + socket.id)
      setsocketid(socket.id)
    })

    socket.on("received-msg", ({message , senderId}) => {
      if (senderId !== socket.id) {
        setallMessages((prevMessages) => [...prevMessages, { text: message, type: 'received' }]);
      }
    })


    return () => {
      socket.disconnect()
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room, senderId: socket.id });
    setallMessages((prevMessages) => [...prevMessages, { text: message, type: 'send' }]);
    setmessage("");
  }

  const handlemessage = (e) => {
    e.preventDefault();
    setmessage(e.target.value)
  }
  const handleroom = (e) => {
    e.preventDefault();
    setroom(e.target.value)
  }

  const handleGroup = (e) => {
    e.preventDefault()
    setGroup(e.target.value)
  }

  const handleGroupsubmit = (e) => {
    e.preventDefault()
    socket.emit("Group", Group)
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl mb-4 font-bold">Get Your Gossip's Done</h1>
      <h1 className=" mb-4 font-bold">{`Your ID : ${socketid}`}</h1>
     
      <div id='box' className="p-4 max-w-md w-full h-96 
      overflow-y-auto border-solid shadow-xl border-2 overflow-x-hidden">
        <ul className="p-0" style={{ listStyle: 'none' }}>
          {allMessages.map((msg, index) => (
            <li key={index} className={`mb-2`}>
              <div className={`pl-5 p-3 rounded-lg shadow-md ${msg.type === 'send' ? ' text-right'  : ' text-left'}`}>
              {msg.text}
            </div>
            </li>
          ))}
        </ul> 
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md mt-4">
        <input
          type="text"
          required
          onChange={handlemessage}
          value={message}
          placeholder="Type your message"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          onChange={handleroom}
          value={room}
          placeholder="Enter Room Id To Chat In Group / Only Id to Private Chat"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Send
        </button>
      </form>

      <form onSubmit={handleGroupsubmit} className="w-full max-w-md mt-4">
        <input
          type="text"
          onChange={handleGroup}
          value={Group}
          placeholder="Enter Group Name To Create or Join Group"
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Create/Join Existing Group
        </button>
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


// <div>
//   <form action="" onSubmit={handleSubmit}>
//     <input type="text"
//     onChange={handlemessage}
//     value={message} name="" id="" />
//     <button type="submit">Send</button>
//   </form>
//   <p>receivedMessages : <br /></p>
//   <ul style={{ listStyleType: 'none' }}>
//     {receivedmessage.map((message , index) => (
//       <li key={index}>{message}</li>
//     ))}
//   </ul>
// </div>

{/* {sendMessages.map((messg, index) => (
          <li key={index} className={`mb-2`}>
            <div className="pl-5 p-3 rounded-lg shadow-md">
              {messg}
            </div>
          </li>
        ))}

        {receivedMessages.map((msg, index) => (
          <li key={index} className={`mb-2`}>
            <div className="pl-5 p-3 rounded-lg shadow-md">
              {msg}
            </div>
          </li>
        ))} */}