const RecentSearch = ({
  chats,
  activeId,
  onSelectChat,
  onNewChat,
  onClearChat,
}) => {
  return (
    <div className="text-white py-2 text-left px-4 ">
      <h1 className=" text-lg font-bold">Recent Searches</h1>
      <div className="mt-2 flex flex-col gap-1">
        <button
          onClick={onNewChat}
          className="flex gap-2 w-full items-center cursor-pointer hover:bg-zinc-500 rounded-md"
        >
          <img
            src="https://img.icons8.com/external-simple-line-edt.graphics/100/external-Chat-bubble-chat-bubbles-simple-line-edt.graphics-4.png"
            alt="new"
            className="w-8 h-8 invert font-bold mt-1"
          />
          <p>New chat</p>
        </button>
        <button
          onClick={onClearChat}
          className="flex gap-2 w-full items-center cursor-pointer hover:bg-zinc-500 rounded-md"
        >
          <img
            src="https://img.icons8.com/windows/32/waste.png"
            alt="new"
            className="w-8 h-8 invert font-bold mt-1"
          />
          <p>Clear history</p>
        </button>
        <button></button>
      </div>
      <div className="mt-2">
        {chats.map((chat) => (
          <p
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`${chat.id === activeId ? "bg-zinc-600" : ""} py-1 px-2 hover:bg-zinc-600 mt-2 rounded-md cursor-pointer`}
          >
            {chat.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RecentSearch;
