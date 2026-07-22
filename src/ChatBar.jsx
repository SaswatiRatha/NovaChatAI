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
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-700 mt-2 pb-1 mx-1 hover:pb-1 text-2xl"
        >
          +
        </button>
        {showOptions && (
          <UploadOptions
            setAudioFile={setAudioFile}
            setShowOptions={setShowOptions}
          />
        )}
      </div>
      <div className="flex items-center flex-1 gap-2 overflow-hidden">
        {audioFile && (
          <div className="flex items-center gap-2 bg-zinc-700 rounded-full px-3 py-1 shrink-0">
            <span>🎵</span>

            <span className="max-w-32 truncate text-sm">{audioFile.name}</span>

            <button
              onClick={() => setAudioFile(null)}
              className="text-red-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        )}

        <input
          onKeyDown={checkEnter}
          onChange={(e) => setquestion(e.target.value)}
          value={question}
          disabled={isSending}
          className="flex-1 bg-transparent outline-none px-2 py-3"
          type="text"
          placeholder="Ask me anything"
        />
      </div>

      <button
        disabled={isSending || (!question.trim() && !audioFile)}
        onClick={handleAskQuestion}
        className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
