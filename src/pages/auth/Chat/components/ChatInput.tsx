import useClickOutside from "@/hooks/useClickOutside";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useClickOutside(() => setShowEmojiPicker(false));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    // Refocus on the textarea after emoji selection
    textareaRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") {
      toast.error("Vui lòng nhập nội dung tin nhắn");
      return;
    }
    onSendMessage(message.trim());
    setMessage(""); // Clear message after sending
  };

  // Handle Enter Key for Sending Message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div ref={dropdownRef} className="py-3 px-2 flex gap-3 relative">
      <div className="border-2 flex rounded-full w-full px-3 bg-white">
        <button onClick={toggleEmojiPicker}>
          <i className="text-primary fa-xl fa-regular fa-face-smile"></i>
        </button>
        <textarea
          data-testid="chat-input"
          ref={textareaRef}
          rows={1}
          placeholder="Nhập lời nhắn tại đây..."
          className="outline-none w-full p-2.5 rounded-full"
          style={{ resize: "none" }}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <button
        data-testid="send-message-button"
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className="flex items-center justify-center gap-2.5 rounded-full bg-primary text-white px-4 hover:bg-opacity-90"
      >
        <i className="fa-lg fa-solid fa-paper-plane"></i>
        <p>GỬI</p>
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-16">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default ChatInput;
