import RecentSearch from "./RecentSearch";

const RecentsModal = ({ chats, activeId, onSelectChat }) => {
  return (
    <div className="w-55 h-max absolute bg-zinc-800 z-20 top-5 px-3 py-3 left-10 text-white border border-white rounded-md">
      <RecentSearch
        chats={chats}
        activeId={activeId}
        onSelectChat={onSelectChat}
      />
    </div>
  );
};

export default RecentsModal;
