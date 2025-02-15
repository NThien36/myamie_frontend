import { chatCharacters } from "@/assets/images";

function NoChat() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img src={chatCharacters} alt="" className="h-60" />
      <p>Một tin nhắn khởi đầu là hàng trăm câu chuyện đang chờ đón!</p>
    </div>
  );
}

export default NoChat;
