import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

const JoinRoom = ({
  socket,
  isLogged,
  setIsLogged,
  username,
  setUsername,
  room,
  setRoom,
}) => {
  const options = ["Frontend", "Backend", "Design"];
  const [open, setOpen] = useState(false);

  //join the room - onClick event
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { username, room });
      setIsLogged(true);
    }
  };

  return (
    <div className='app w-full flex justify-center items-center mx-auto'>
      <div className='select_div w-[300px] h-[500px] bg-[#2b2b2b] px-[2em] py-[4em] border-2 border-[#67ff4f] shadow-md shadow-[#67ff4f6f] rounded-lg cursor-pointer flex flex-col justify-center gap-[.2em]'>
        <input
          type='text'
          placeholder='Username...'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className='w-full bg-[#2b2b2b] p-[.5em]  border-2 border-[#67ff4f] text-sm font-light text-gray-300 outline-none rounded-md mb-[.5em] focus:shadow-[#67ff4f6f]'
        />
        <div
          onClick={() => setOpen(!open)}
          className='select mb-[.5em] w-full p-[.5em] border-2 border-[#67ff4f] shadow-md shadow-[#67ff4f6f] text-gray-500 text-center rounded-md flex justify-between items-center'
        >
          {room}
          <BiSolidDownArrow />
        </div>
        <ul
          className={`w-full  border-2 border-[#67ff4f] shadow-md rounded-md text-gray-500 text-center ${
            open ? "block" : "hidden"
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              className='bg-[#4f4f4f] p-[.5em] border-b text-gray-400 hover:bg-[#67ff4f6f] hover:text-white'
              onClick={(e) => {
                setRoom(e.target.innerText);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
        <button
          onClick={joinRoom}
          className='w-full text-center text-white border-2 border-[#67ff4f] bg-[#67ff4f] shadow-[#67ff4f6f] p-[.5em] rounded-md hover:bg-transparent hover:text-[#67ff4f] transition-colors ease-in duration-300'
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
