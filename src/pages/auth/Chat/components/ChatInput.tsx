import useClickOutside from "@/hooks/useClickOutside";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

function ChatInput() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useClickOutside(() => setShowEmojiPicker(false));

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleEmojiClick = (e: EmojiClickData) =>
    setMessage((prev) => prev + e.emoji);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  return (
    <div ref={dropdownRef} className="py-3 px-2 flex gap-3 relative">
      <div className="border-2 flex rounded-full w-full px-3 bg-white">
        <button onClick={toggleEmojiPicker}>
          <i className="text-primary fa-xl fa-regular fa-face-smile"></i>
        </button>
        <textarea
          name=""
          id=""
          rows={1}
          placeholder="Nhập lời nhắn tại đây..."
          className="outline-none w-full p-2.5 rounded-full"
          style={{ resize: "none" }}
          value={message}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="flex items-center justify-center gap-2.5 rounded-full bg-primary text-white px-4 hover:bg-opacity-90">
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
