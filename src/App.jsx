import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatQnA from "./ChatQnA";
import ChatBar from "./ChatBar";

import { SmallSidebar } from "./SmallSidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [question, setquestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [mode, setMode] = useState("text");
  const [audioFile, setAudioFile] = useState(null);
  const [chats, setChats] = useState(() => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  });

  const [activeId, setActiveId] = useState(() => {
    return chats[0]?.id ?? null;
  });

  const API_URL = "http://localhost:3001";
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
    if (mode === "audio") {
      if (!audioFile) return;
    } else {
      if (!question.trim()) return;
    }
    setIsSending(true);
    const currentQuestion = question;
    const currentMode = mode;

    setquestion("");
    let chatId = activeId;
    const chatExists = chats.some((chat) => chat.id === chatId);
    if (!chatExists) {
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
                {
                  question:
                    currentMode === "audio"
                      ? audioFile?.name || "Audio"
                      : currentQuestion,
                  answer: "",
                  loading: true,
                  type: currentMode,
                },
              ],
            }
          : chat,
      ),
    );

    try {
      let endpoint;

      switch (currentMode) {
        case "text":
          endpoint = "/api/ask";
          break;

        case "image":
          endpoint = "/api/generate-image";
          break;

        case "audio":
          endpoint = "/api/transcribe";
          break;
      }

      let response;

      if (currentMode === "audio") {
        const formData = new FormData();
        formData.append("audio", audioFile);

        response = await fetch(`${API_URL}/api/transcribe`, {
          method: "POST",
          body: formData,
        });
      } else {
        const bodyKey = currentMode === "text" ? "question" : "prompt";
        response = await fetch(`${API_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ [bodyKey]: currentQuestion }),
        });
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const err = new Error(errorBody.error || "Request failed");
        err.status = response.status;
        throw err;
      }

      const data = await response.json();
      console.log(data.image);

      let answer;

      switch (currentMode) {
        case "text":
          answer = data.answer;
          break;

        case "image":
          answer = data.image;
          break;

        case "audio":
          answer = data.transcript;
          break;
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                results: chat.results.map((item, index) =>
                  index === chat.results.length - 1
                    ? {
                        ...item,
                        answer: answer,
                        loading: false,
                      }
                    : item,
                ),
              }
            : chat,
        ),
      );
      setAudioFile(null);
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
      setAudioFile(null);
    }
  };

  const handleClearChat = () => {
    localStorage.setItem("history", JSON.stringify([]));
    setChats([]);
    setActiveId(null);
    setquestion("");
  };

  const handleChatDelete = (id) => {
    setChats((prev) => {
      const updated = prev.filter((chat) => chat.id !== id);
      if (activeId === id) {
        setActiveId(updated[0]?.id ?? null);
      }
      return updated;
    });
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
          mode={mode}
          setMode={setMode}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
        />
      </div>
    </div>
  );
}

export default App;
