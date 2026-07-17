import { useState } from "react";
import UploadOptions from "./UploadOptions";

const ChatBar = ({
  handleAskQuestion,
  question,
  setquestion,
  isSending,
  audioFile,
  setAudioFile,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const checkEnter = (e) => {
    if (!question.trim()) return;

    if (e.key === "Enter") {
      handleAskQuestion();
    }
  };

  return (
    <div className="bg-zinc-800 flex w-3/4 text-white m-auto rounded-3xl border border-zinc-400">
      <div className="relative">
        <button
          onClick={() => setShowOptions((prev) => !prev)}
          disabled={isSending}
          className="px-2 cursor-pointer"
        >
          +
        </button>
        {showOptions && <UploadOptions setAudioFile={setAudioFile} />}
      </div>
      <input
        onKeyDown={checkEnter}
        onChange={(e) => setquestion(e.target.value)}
        value={question}
        disabled={isSending}
        className="w-full outline-none p-3"
        type="text"
        placeholder="Ask me anything"
      />

      <button
        disabled={isSending || question.trim() === ""}
        onClick={handleAskQuestion}
        className={`border-0 bg-none px-3 text-white cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400`}
      >
        <img
          src="https://img.icons8.com/material-sharp/24/sent.png"
          alt="send"
          className="w-5 h-5 invert"
        />
      </button>
    </div>
  );
};

export default ChatBar;
