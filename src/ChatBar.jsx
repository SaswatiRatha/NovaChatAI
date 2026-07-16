const ChatBar = ({
  handleAskQuestion,
  question,
  setquestion,
  isSending,
  mode,
  setMode,
  audioFile,
  setAudioFile,
}) => {
  const checkEnter = (e) => {
    if (mode === "audio") return;

    if (!question.trim()) return;

    if (e.key === "Enter") {
      handleAskQuestion();
    }
  };
  const changeMode = () => {
    if (mode === "text") {
      setMode("image");
    } else if (mode === "image") {
      setMode("audio");
    } else {
      setMode("text");
    }
  };

  return (
    <div className="bg-zinc-800 flex w-3/4 text-white m-auto rounded-3xl border border-zinc-400">
      <button
        onClick={changeMode}
        disabled={isSending}
        className="px-2 cursor-pointer"
      >
        {mode === "text" ? "💬" : mode === "image" ? "🖼️" : "🎤"}
      </button>
      {mode === "audio" && (
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
      )}
      {mode !== "audio" && (
        <input
          onKeyDown={checkEnter}
          onChange={(e) => setquestion(e.target.value)}
          value={question}
          disabled={isSending}
          className="w-full outline-none p-3"
          type="text"
          placeholder={
            mode === "text" ? "Ask me anything" : "Describe the image"
          }
        />
      )}
      <button
        disabled={
          isSending || (mode === "audio" ? !audioFile : question.trim() === "")
        }
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
