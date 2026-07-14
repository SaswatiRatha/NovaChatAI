const RecentSearch = ({ chats, activeId, onSelectChat, onDeleteChat }) => {
  return (
    <div className="">
      <h1 className=" text-base font-bold">Recents</h1>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex justify-between ${chat.id === activeId ? "bg-zinc-600" : ""} py-1 px-2 hover:bg-zinc-600 mt-2 rounded-md cursor-pointer items-center`}
        >
          <p
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="truncate "
          >
            {chat.title}
          </p>
          <button onClick={() => onDeleteChat(chat.id)}>
            <img
              src="https://img.icons8.com/windows/32/waste.png"
              alt="new"
              className="w-5 h-5 invert font-bold mt-1 cursor-pointer"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearch;
