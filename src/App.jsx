import { useEffect, useState } from "react";
import "./App.css";

import ai from "./gemini";
import RecentSearch from "./RecentSearch";
import ChatQnA from "./ChatQnA";
import ChatBar from "./ChatBar";

function App() {
  const [question, setquestion] = useState("");
  const [chats, setChats] = useState(() => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  });

  const [activeId, setActiveId] = useState(() => {
    return chats[0]?.id ?? null;
  });

  const activeChat = chats.find((chat) => chat.id === activeId);
  const results = activeChat?.results ?? [];

  const handleNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      results: [],
    };
    console.log(newChat);

    setChats((prev) => [newChat, ...prev]);
    setActiveId(newChat.id);
    setquestion("");
  };
  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;
    setquestion("");
    let chatId = activeId;
    if (!chatId) {
      chatId = crypto.randomUUID();
      setChats((prev) => [
        { id: chatId, title: currentQuestion.slice(0, 40), results: [] },
        ...prev,
      ]);
      setActiveId(chatId);
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title:
                chat.results.length === 0
                  ? currentQuestion.slice(0, 40)
                  : chat.title,
              results: [
                ...chat.results,
                { question: currentQuestion, answer: "", loading: true },
              ],
            }
          : chat,
      ),
    );

    try {
      const interaction = await ai.interactions.create({
        model: "gemini-2.5-flash",
        input: currentQuestion,
      });

      const data = interaction.output_text;

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                results: chat.results.map((item, index) =>
                  index === chat.results.length - 1
                    ? {
                        ...item,
                        answer: data,
                        loading: false,
                      }
                    : item,
                ),
              }
            : chat,
        ),
      );
    } catch (error) {
      console.log(error);
      setquestion(currentQuestion);
    }
  };
  const handleClearChat = () => {
    localStorage.setItem("history", []);
    setChats([]);
  };
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
        <RecentSearch
          chats={chats}
          activeId={activeId}
          onSelectChat={setActiveId}
          onNewChat={handleNewChat}
          onClearChat={handleClearChat}
        />
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
