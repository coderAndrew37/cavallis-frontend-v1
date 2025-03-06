import { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaComments,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import api from "../api/http";
import { useAuth } from "../hooks/useAuth";

const Chatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Load chat history
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true); // Show loading indicator

    localStorage.setItem("chatHistory", JSON.stringify(newMessages));

    try {
      const { data } = await api.post("/chatbot", {
        inputs: input, // ✅ Corrected payload format
        userId: user?.id || null,
      });

      const botResponse = { sender: "bot", text: data.reply };
      setMessages([...newMessages, botResponse]);
      localStorage.setItem(
        "chatHistory",
        JSON.stringify([...newMessages, botResponse])
      );
    } catch {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Chat Close (Clears Messages)
  const closeChat = () => {
    setIsOpen(false);
    setMessages([]); // ✅ Clear chat when closing
    localStorage.removeItem("chatHistory");
  };

  return (
    <>
      {/* 🔹 Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg transition 
        ${isOpen ? "hover:bg-red-500" : "hover:bg-green-700"}`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>

      {/* 🔹 Chatbot Container */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-lg border transition-transform transform scale-95 animate-fadeIn">
          {/* 🔹 Header */}
          <div className="bg-green-600 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaRobot className="mr-2" /> <span>AI Chatbot</span>
            </div>
            <button onClick={closeChat}>
              <FaTimes />
            </button>
          </div>

          {/* 🔹 Chat Messages */}
          <div className="p-3 h-64 overflow-y-auto" ref={chatRef}>
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Ask me anything! 😊</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg my-1 ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <FaUser className="inline mr-1" />
                    ) : (
                      <FaRobot className="inline mr-1" />
                    )}
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start mt-2">
                <div className="p-2 rounded-lg bg-gray-300 text-black">
                  <FaSpinner className="animate-spin inline mr-2" /> Typing...
                </div>
              </div>
            )}
          </div>

          {/* 🔹 Chat Input */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white p-2 rounded-r-lg hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
