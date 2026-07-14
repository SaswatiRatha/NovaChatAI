import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import { useEffect, useRef } from "react";
const ChatQnA = ({ results, chatId }) => {
  const containerRef = useRef(null);
  const messageRefs = useRef([]);
  const prevLengthRef = useRef(0);
  const prevChatIdRef = useRef(null);
  console.log(results);

  useEffect(() => {
    const chatChanged = prevChatIdRef.current !== chatId;
    const lastIndex = results.length - 1;

    if (chatChanged) {
      messageRefs.current[lastIndex]?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    } else if (results.length > prevLengthRef.current) {
      messageRefs.current[lastIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    prevLengthRef.current = results.length;
    prevChatIdRef.current = chatId;
  }, [results.length, chatId]);

  if (results.length === 0) {
    return (
      <div className="container">
        <h1 className="fixed text-white text-left px-2 py-2 text-xl font-bold">
          NovaChat
        </h1>
        <div className="text-center flex flex-col h-120 items-center justify-center text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to NovaChat</h1>
          <p className="text-zinc-400">
            Ask me anything to get started — I can help with questions, code,
            and more.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className="container h-120 overflow-y-auto overflow-x-hidden scrollbar-none"
    >
      <h1 className="fixed text-white text-left px-2 py-2 text-xl font-bold">
        NovaChat
      </h1>
      <div className=" mt-18 px-2 w-3/4 m-auto">
        <div className="text-white text-left space-y-6">
          {results.map((item, index) => {
            const isLast = index === results.length - 1;
            return (
              <div
                key={index}
                ref={(msg) => (messageRefs.current[index] = msg)}
                style={isLast ? { minHeight: "70vh" } : undefined}
              >
                <div className="flex justify-end mb-3">
                  <div className="bg-zinc-500 rounded-b-3xl rounded-tl-3xl px-4 py-2 max-w-[70%]">
                    {item.question}
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-zinc-700 rounded-b-2xl rounded-tr-2xl px-4 py-2 max-w-[80%] box-border">
                    {item.loading ? (
                      <div className="flex gap-1 py-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:150ms]"></span>
                        <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:300ms]"></span>
                      </div>
                    ) : (
                      <ReactMarkdown components={MarkdownComponents}>
                        {item.answer}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatQnA;
