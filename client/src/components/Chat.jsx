import { useEffect, useState } from "react";

const Chat = ({username, room, socket}) => {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if(message !== ""){
            
            const messageInfo = {
                author: username,
                message: message,
                room: room,
                time: new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
               
            }
            
            await socket.emit("send_message", messageInfo )

        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className="chat w-[100vw] h-[100vh] bg-[#2b2b2b] p-[1em] overflow-hidden text-white">
            <div className="chat-header h-[10%] w-full bg-[#67ff4f] mb-[.5em]">LOGO</div>
            <div className="chat-body overflow-y-scroll border-2 border-[#67ff4f] shadow-sm shadow-[#67ff4f85] w-full h-[70%] mb-[.5em]">
                {messageList.map(msg => {
                    <p>{msg.message}</p>
                })}
            </div>
            <div className="chat-footer h-[15%] w-full border border-[#67ff4f] rounded-md">
                <input type="text" className="h-full w-[85%] bg-transparent" onChange={(e) => setMessage(e.target.value)}/>
                <button className="w-[15%] h-full bg-[#67ff4f] uppercase text-white hover:bg-[#39932b]"
                onClick={sendMessage}>send</button>
            </div>
        </div>
    );
}
 
export default Chat;