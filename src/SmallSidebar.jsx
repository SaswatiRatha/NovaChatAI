import { useState } from "react";
import RecentsModal from "./RecentsModal";
import Logo from "./assets/Logo.png";
import sidebar from "./assets/sidebar.png";
export const SmallSidebar = ({
  chats,
  onNewChat,
  onClearChat,
  setShowSidebar,
  activeId,
  onSelectChat,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-20">
      <div className="flex justify-center items-center px-4 py-4 ">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <img
              src={sidebar}
              alt="sidebar"
              onClick={() => setShowSidebar((prev) => !prev)}
              className="w-7 h-7 invert cursor-e-resize"
            />
          ) : (
            <img
              src={Logo}
              alt="logo"
              className="w-7 h-7 cursor-pointer"
              onClick={onClearChat}
            />
          )}
        </button>
      </div>
      <div className="flex flex-col items-center gap-2 px-4 mt-2">
        <img
          onClick={onNewChat}
          src="https://img.icons8.com/external-simple-line-edt.graphics/100/external-Chat-bubble-chat-bubbles-simple-line-edt.graphics-4.png"
          alt="new"
          className="w-8 h-8 invert font-bold mt-1 cursor-pointer"
        />
        <img
          onClick={onClearChat}
          src="https://img.icons8.com/windows/32/waste.png"
          alt="new"
          className="w-8 h-8 invert font-bold mt-1 cursor-pointer"
        />
        <div className="relative">
          <img
            onClick={() => setShowModal((prev) => !prev)}
            src="https://img.icons8.com/fluency-systems-regular/48/chat--v1.png"
            alt="recents"
            className=" w-8 h-8 invert font-bold mt-1 cursor-pointer"
          />
          {showModal && (
            <RecentsModal
              chats={chats}
              activeId={activeId}
              onSelectChat={onSelectChat}
            />
          )}
        </div>
      </div>
    </div>
  );
};
