const RecentSearch = ({ chats, activeId, onSelectChat, onNewChat }) => {
  return (
    <div className="text-white py-2 text-left px-4 ">
      <h1 className=" text-lg font-bold">Recent Searches</h1>
      <button
        onClick={onNewChat}
        className="border border-zinc-400 bg-zinc-400 rounded-full px-2 pb-1"
      >
        +
      </button>
      <div className="mt-2">
        {chats.map((chat) => (
          <p
            key={chat.id}
            onClick={() => onSelectChat(chats.id)}
            className={chat.id === activeId ? "bg-zinc-600" : ""}
          >
            {chat.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RecentSearch;
