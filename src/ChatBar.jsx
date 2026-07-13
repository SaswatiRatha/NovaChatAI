const ChatBar = ({ handleAskQuestion, question, setquestion }) => {
  const checkEnter = (e) => {
    if (!question) return false;
    if (e.key === "Enter") {
      handleAskQuestion();
    }
  };
  return (
    <div className="bg-zinc-800 flex w-3/4 text-white m-auto rounded-3xl border border-zinc-400">
      <input
        onKeyDown={checkEnter}
        onChange={(e) => setquestion(e.target.value)}
        value={question}
        className="w-full h-full outline-none p-3"
        type="text"
        placeholder="Ask me anything"
      />
      <button
        disabled={question.trim() === ""}
        onClick={handleAskQuestion}
        className={`border-0 bg-none px-3 text-white cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400`}
      >
        Ask
      </button>
    </div>
  );
};

export default ChatBar;
