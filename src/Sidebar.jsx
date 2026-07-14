import RecentSearch from "./RecentSearch";
import Logo from "./assets/Logo.png";
import sidebar from "./assets/sidebar.png";
const Sidebar = ({
  chats,
  onNewChat,
  onClearChat,
  onSelectChat,
  setShowSidebar,
  activeId,
  onDeleteChat,
}) => {
  return (
    <div className="w-60 text-white py-4 text-left px-4 ">
      <div className="flex justify-between items-center ">
        <img
          src={Logo}
          alt="logo"
          className="w-7 h-7 cursor-pointer"
          onClick={onNewChat}
        />
        <img
          src={sidebar}
          alt="sidebar"
          onClick={() => setShowSidebar((prev) => !prev)}
          className="w-6 h-6 invert cursor-e-resize"
        />
      </div>
      <div className="flex flex-col gap-1 mt-4">
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
      </div>
      <div className="mt-6">
        <RecentSearch
          chats={chats}
          activeId={activeId}
          onSelectChat={onSelectChat}
          onDeleteChat={onDeleteChat}
        />
      </div>
    </div>
  );
};

export default Sidebar;
