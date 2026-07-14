const ChatBar = ({ handleAskQuestion, question, setquestion, isSending }) => {
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
        disabled={isSending}
        className="w-full h-full outline-none p-3"
        type="text"
        placeholder="Ask me anything"
      />
      <button
        disabled={question.trim() === "" || isSending}
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
