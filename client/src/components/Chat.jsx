import { useEffect, useState } from "react";
import {BiSend} from 'react-icons/bi'

const Chat = ({ username, room, socket }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageInfo = {
        username: username,
        message: message,
        room: room,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        }),
      };

      //added this, so we can see the message we sent on the screen as well as the received message
      setMessageList((prevMessageList) => [
        ...prevMessageList,
        {
          username: messageInfo.username,
          room: messageInfo.room,
          time: messageInfo.time,
          message: messageInfo.message,
        },
      ]);

      await socket.emit("send_message", messageInfo);
      
      

      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevMessageList) => [
        ...prevMessageList,
        {
          username: data.username,
          room: data.room,
          time: data.time,
          message: data.message,
        },
      ]);
    });

    //cleanup function is defined to remove the event listener when the component unmounts using socket.off("receive_message")
    //This ensures that the event listener is only registered once and prevents multiple instances of the event handler from being active, which could result in receiving duplicate messages.
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);


  return (
    <div className='chat w-[100vw] h-[100vh] bg-[#2b2b2b] p-[1em] overflow-hidden text-white'>
      <div className='chat-header h-[10%] w-full bg-[#67ff4f] mb-[.5em]'>
        LOGO
      </div>

      <div className='chat-body overflow-y-scroll rounded-md border-2 border-[#67ff4f] w-full h-[70%] p-[1em] mb-[.5em] flex flex-col gap-2'>
        {messageList.map((msg) => (
          <div
            key={msg}
            className={` msg-box w-fit flex flex-col rounded-md py-1 px-2 ${
              username === msg.username ? "bg-gray-200" : "bg-green-300"
            }`}
            style={{ alignSelf: username === msg.username ? "flex-start" : "flex-end" }}
          >
            <div className='msg'>
              <p>{msg.message}</p>
            </div>
            <div className='meta text-xs text-gray-400'>
              <p>
                {msg.username} <span>{msg.time}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='chat-footer h-[15%] w-full border border-[#67ff4f] hover:shadow-lg hover:shadow-[#67ff4f85] rounded-md flex'>
        <input
          type='text'
          value={message}
          className='h-full md:w-[90%] w-[85%] bg-transparent'
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className='md:w-[10%] w-[15%] h-full bg-[#67ff4f] text-white hover:bg-[#39932b] flex justify-center items-center'
          onClick={sendMessage}
        >
          <BiSend size={40}/>
        </button>
      </div>
    </div>
  );
};

export default Chat;
