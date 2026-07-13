import { useEffect, useState } from "react";
import "./App.css";

import ai from "./gemini";
import RecentSearch from "./RecentSearch";
import ChatQnA from "./ChatQnA";
import ChatBar from "./ChatBar";

function App() {
  const [question, setquestion] = useState("");
  const [results, setResults] = useState(() => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  });

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion,
        answer: "",
        loading: true,
      },
    ]);

    setquestion("");

    try {
      const interaction = await ai.interactions.create({
        model: "gemini-2.5-flash",
        input: currentQuestion,
      });

      const data = interaction.output_text;

      setResults((prev) =>
        prev.map((item, index) =>
          index === prev.length - 1
            ? {
                ...item,
                answer: data,
                loading: false,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(results));
  }, [results]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
        <RecentSearch results={results} />
      </div>
      <div className="col-span-4 px-4 py-2">
        <ChatQnA results={results} />
        <ChatBar
          handleAskQuestion={handleAskQuestion}
          question={question}
          setquestion={setquestion}
        />
      </div>
    </div>
  );
}

export default App;
