import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import { useEffect, useRef } from "react";
const ChatQnA = ({ results }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  console.log(results);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [results]);
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
          {results.map((item, index) => (
            <div key={index}>
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
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatQnA;
