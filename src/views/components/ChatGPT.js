import React, { useState } from "react";
import axios from "axios";
import { FaCommentDots } from "react-icons/fa";

const ChatGPT = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Chào bạn! 🌸 Bạn có muốn tìm hoa hoặc quà tặng nào đặc biệt không? 💖",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Mở mặc định

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(
        "https://backendflower-9t22.onrender.com/api/chat",
        { message: input }
      );
      const botReply = res.data.reply || "Xin lỗi, mình không hiểu ý bạn 🥺";
      setMessages([...newMessages, { from: "bot", text: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { from: "bot", text: "❌ Bot không phản hồi. Vui lòng thử lại sau." },
      ]);
      console.error("Lỗi gọi API chatbot:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container-profile">
      {!isOpen && (
        <button
          className="chat-toggle-profile"
          onClick={() => setIsOpen(true)}
          aria-label="Mở trò chuyện"
        >
          <FaCommentDots size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-box-profile">
          <div className="chat-header-profile">
            <span className="heading-profile">Hỗ trợ tư vấn 💐</span>
            <button
              className="close-btn-profile"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          <div className="chat-body-profile">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message-profile ${
                  msg.from === "bot" ? "bot" : "user"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-area-profile">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="input-profile"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="login-button-profile" onClick={sendMessage}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;
