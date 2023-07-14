import { useEffect, useState } from "react";
import Images from "../Images";
import ActiveUsersList from "./ActiveUsersList";

const Chat = ({ username, room, socket }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showActiveUsers, setShowActiveUsers] = useState(false);

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
    <div className='chat relative w-[95vw] h-[95vh] bg-[#2b2b2b] my-[1em] sm:px-[1em] overflow-hidden text-white border-2 border-[#67ff4f] rounded-md'>
      <div className='chat-header h-[12%] py-[.3em] w-full border-b-2 border-b-[#67ff4f] flex justify-between items-center'>
        <img src={Images.logo} alt='logo' className='max-h-[3em]' />
        <img
          src={Images.usersLogo}
          onClick={() => setShowActiveUsers(!showActiveUsers)}
          alt='active-users'
          className='max-h-[3em] hover:transition-all hover:scale-75'
        />
      </div>

      <div className='chat-body overflow-y-scroll rounded-md w-full sm:h-[65%] h-[70%] p-[1em] mb-[.5em] flex flex-col gap-2'>
        {messageList.map((msg) => (
          <div
            key={msg}
            className={` msg-box w-fit flex flex-col rounded-md py-1 px-2 sm:text-base text-sm tracking-wide font-light ${
              username === msg.username ? "bg-gray-500" : "bg-green-300"
            }`}
            style={{
              alignSelf: username === msg.username ? "flex-start" : "flex-end",
              textAlign: username === msg.username ? "start" : "end"
            }}
          >
            <div className='msg'>
              <p>{msg.message}</p>
            </div>
            <div className='meta text-xs font-extralight text-gray-400'>
              <p>
                {msg.username} <span>{msg.time}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='chat-footer h-[20%]  w-full border border-[#67ff4f] hover:shadow-lg hover:shadow-[#67ff4f85] rounded-md flex'>
        <input
          type='text'
          placeholder='Type...'
          value={message}
          className='h-full outline-none sm:w-[90%] w-full bg-transparent px-[.2em] sm:text-lg tracking-wide text-md'
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className='sm:w-[10%] w-fit h-full  text-white flex justify-center items-center px-[.2em]'
          onClick={sendMessage}
        >
          <img
            src={Images.sendBtn}
            alt='send'
            className='sm:h-[4em] h-[3em] hover:transition-all hover:scale-75'
          />
        </button>
      </div>

      {/* active users div */}
      {showActiveUsers && <ActiveUsersList />}
    </div>
  );
};

export default Chat;
