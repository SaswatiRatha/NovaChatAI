const RecentSearch = ({ chats, activeId, onSelectChat }) => {
  return (
    <div className="">
      <h1 className=" text-base font-bold">Recents</h1>
      {chats.map((chat) => (
        <p
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`${chat.id === activeId ? "bg-zinc-600" : ""} py-1 px-2 hover:bg-zinc-600 truncate mt-2 rounded-md cursor-pointer`}
        >
          {chat.title}
        </p>
      ))}
    </div>
  );
};

export default RecentSearch;
