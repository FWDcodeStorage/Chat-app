const ActiveUsersList = ({username}) => {
  return (
    <div className='active_users absolute top-[12%] right-0 xl:w-[30%] lg:w-[35%] md:w-[50%] sm:w-[60%] w-[90%] z-10 h-[90%] bg-[#2b2b2b] border-2 border-[#67ff4f] sm:px-[2em] px-[1em] sm:py-[2em] py-[.5em] flex flex-col justify-start items-center'>
      <p className='uppercase sm:text-lg text-md font-bold tracking-wider text-[#67ff4f] mb-[4em]'>
        <strong>active users</strong>
      </p>
      <div className='list_of_active flex flex-col items-center gap-[2em]'>
        <div className='single_user flex flex-col'>
          <div className='user_photo'></div>
          <div className='user_name'>{username}</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersList;
