import { useEffect, useState } from "react";
import "./App.css";

import ReactMarkdown from "react-markdown";
import MarkdownComponents from "./MarkdownComponents";
import ai from "./gemini";

function App() {
  const [question, setquestion] = useState("");
  const [results, setResults] = useState(() => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  });

  const handleAskQuestion = async () => {
    try {
      const interaction = await ai.interactions.create({
        model: "gemini-2.5-flash",
        input: question,
      });

      const data = interaction.output_text;

      setResults((prev) => [
        ...prev,
        {
          question: question,
          answer: data,
        },
      ]);
    } catch (error) {
      console.error(error);

      alert("Rate limit reached. Please wait a few seconds and try again.");
    }

    setquestion("");
  };
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(results));
  }, [results]);

  const checkEnter = (e) => {
    if (!question) return false;
    if (e.key === "Enter") {
      handleAskQuestion();
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
        <h1>Recent Searches</h1>
      </div>
      <div className="col-span-4 px-4 py-2">
        <div className="container h-120 pt-10 px-2 overflow-y-auto overflow-x-hidden scrollbar-none w-3/4 m-auto">
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
                    <ReactMarkdown components={MarkdownComponents}>
                      {item.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default App;
