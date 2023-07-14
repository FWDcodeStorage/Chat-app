import { useEffect, useState } from "react";

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

      await socket.emit("send_message", messageInfo);
      //added this, so we can see the message we sent on the screen as well as the received message
      setMessageList([
        ...messageList,
        {
          username: messageInfo.username,
          room: messageInfo.room,
          time: messageInfo.time,
          message: messageInfo.message,
        },
      ]);

      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //changed this
      //so we can see received message
      setMessageList([
        ...messageList,
        {
          username: data.username,
          room: data.room,
          time: data.time,
          message: data.message,
        },
      ]);
    });
  }, [socket]);

  return (
    <div className='chat w-[100vw] h-[100vh] bg-[#2b2b2b] p-[1em] overflow-hidden text-white'>
      <div className='chat-header h-[10%] w-full bg-[#67ff4f] mb-[.5em]'>
        LOGO
      </div>

      <div className='chat-body overflow-y-scroll border-2 border-[#67ff4f] shadow-sm shadow-[#67ff4f85] w-full h-[70%] mb-[.5em] flex flex-col gap-2'>
        {messageList.map((msg) => (
          <div
            key={msg}
            className={`w-fit flex flex-col rounded-md py-1 px-2 msg-box ${
              username === msg.username ? "bg-gray-200" : "bg-green-300"
            }`}
            id={username === msg.username ? "me" : "you"}
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

      <div className='chat-footer h-[15%] w-full border border-[#67ff4f] rounded-md'>
        <input
          type='text'
          value={message}
          className='h-full w-[85%] bg-transparent'
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className='w-[15%] h-full bg-[#67ff4f] uppercase text-white hover:bg-[#39932b]'
          onClick={sendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
