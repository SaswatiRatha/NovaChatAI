import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatQnA from "./ChatQnA";
import ChatBar from "./ChatBar";

import { SmallSidebar } from "./SmallSidebar";

const fileToBase64 = (file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [question, setquestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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
    console.log("clicked");
    console.log(audioFile);

    if (!audioFile && !imageFile && !question.trim()) {
      return;
    }
    setIsSending(true);
    const currentQuestion = question;
    const imagePreview = imageFile ? await fileToBase64(imageFile) : null;

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
                  ? audioFile
                    ? audioFile.name
                    : currentQuestion.slice(0, 40)
                  : chat.title,
              results: [
                ...chat.results,
                {
                  question: imageFile
                    ? currentQuestion || ""
                    : audioFile
                      ? audioFile.name
                      : currentQuestion,
                  answer: "",
                  loading: true,
                  type: audioFile ? "audio" : "text",
                  imagePreview,
                },
              ],
            }
          : chat,
      ),
    );

    try {
      let response;

      if (audioFile) {
        console.log("inside audiofile try block");

        const formData = new FormData();
        formData.append("audio", audioFile);

        response = await fetch(`${API_URL}/api/transcribe`, {
          method: "POST",
          body: formData,
        });
      } else if (imageFile) {
        console.log("Inside image file try block");
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("prompt", currentQuestion || "What's in this image?");

        response = await fetch(`${API_URL}/api/vision`, {
          method: "POST",
          body: formData,
        });
      } else {
        console.log("inside try text block");
        const priorChat = chats.find((chat) => chat.id === chatId);
        const convHistory = (priorChat?.results ?? [])
          .filter((r) => r.type === "text" && !r.error)
          .flatMap((r) => [
            { role: "user", content: r.question },
            { role: "assistant", content: r.answer },
          ]);

        response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            prompt: currentQuestion,
            history: convHistory,
          }),
        });
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const err = new Error(errorBody.error || "Request failed");
        err.status = response.status;
        throw err;
      }

      const data = await response.json();
      //console.log(data.image);

      const answer = audioFile ? data.transcript : data.answer;
      const type = audioFile ? "audio" : imageFile ? "text" : data.type;
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                results: chat.results.map((item, index) =>
                  index === chat.results.length - 1
                    ? {
                        ...item,
                        answer,
                        type,
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
      setImageFile(null);
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
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      </div>
    </div>
  );
}

export default App;
