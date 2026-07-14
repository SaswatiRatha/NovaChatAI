import { useEffect, useState } from "react";
import "./App.css";

import ai from "./gemini";
import Sidebar from "./Sidebar";
import ChatQnA from "./ChatQnA";
import ChatBar from "./ChatBar";

import { SmallSidebar } from "./SmallSidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [question, setquestion] = useState("");
  const [isSending, setIsSending] = useState(false);
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
    //console.log(newChat);
    setChats((prev) => [newChat, ...prev]);
    setActiveId(newChat.id);
    setquestion("");
  };
  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setIsSending(true);
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
      const errorMessage =
        error.status === 429 || error?.message?.includes("429")
          ? "Too many requests - please wait a moment and try again."
          : "Something went wrong. Please try again.";
      console.log(errorMessage);

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                results: chat.results.map((item, index) =>
                  index === chat.results.length - 1
                    ? {
                        ...item,
                        answer: errorMessage,
                        loading: false,
                        error: true,
                      }
                    : item,
                ),
              }
            : chat,
        ),
      );
      console.log(chats);

      setquestion(currentQuestion);
    } finally {
      setIsSending(false);
    }
  };
  const handleClearChat = () => {
    localStorage.setItem("history", []);
    setChats([]);
  };
  const handleChatDelete = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="flex h-screen">
      <div className="h-screen shrink-0 bg-zinc-800">
        {showSidebar ? (
          <Sidebar
            chats={chats}
            activeId={activeId}
            onSelectChat={setActiveId}
            onNewChat={handleNewChat}
            onClearChat={handleClearChat}
            setShowSidebar={setShowSidebar}
            onDeleteChat={handleChatDelete}
          />
        ) : (
          <SmallSidebar
            chats={chats}
            activeId={activeId}
            onSelectChat={setActiveId}
            onNewChat={handleNewChat}
            onClearChat={handleClearChat}
            setShowSidebar={setShowSidebar}
            onDeleteChat={handleChatDelete}
          />
        )}
      </div>
      <div className="flex-1 px-4 py-2">
        <ChatQnA results={results} chatId={activeId} />
        <ChatBar
          handleAskQuestion={handleAskQuestion}
          question={question}
          setquestion={setquestion}
          isSending={isSending}
        />
      </div>
    </div>
  );
}

export default App;
