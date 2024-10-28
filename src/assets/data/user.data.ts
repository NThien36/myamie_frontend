import { User, UserDetail } from "@/models/user.interface";

export const userData: User[] = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/50", // Low-quality avatar image
    name: "John Doe",
    shortDescription:
      "Avid traveler and food enthusiast.Avid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiastAvid traveler and food enthusiast",
    distance: 5.2, // in kilometers
    city: "New York",
    characteristics: ["Friendly", "Adventurous", "Outgoing"],
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/50",
    name: "Jane Smith",
    shortDescription: "Tech geek and coffee lover.",
    distance: 10.1,
    city: "Los Angeles",
    characteristics: ["Creative", "Tech-savvy", "Ambitious"],
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/50",
    name: "Emily Clark",
    shortDescription: "Nature lover and mountain hiker.",
    distance: 8.3,
    city: "Denver",
    characteristics: ["Outdoor enthusiast", "Calm", "Inquisitive"],
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/50",
    name: "Michael Brown",
    shortDescription: "Historian and amateur photographer.",
    distance: 12.7,
    city: "Boston",
    characteristics: ["Curious", "Analytical", "Creative"],
  },
  {
    id: 5,
    avatar: "https://via.placeholder.com/50",
    name: "Sarah Green",
    shortDescription: "Entrepreneur and fitness coach.",
    distance: 4.9,
    city: "Orlando",
    characteristics: ["Driven", "Energetic", "Inspirational"],
  },
];

export const userDetailData: UserDetail = {
  id: 1,
  cover: "https://picsum.photos/800/300",
  avatar: "https://i.pravatar.cc/150?img=10",
  name: "Jane Doe",
  shortDescription: "Friendly and adventurous traveler",
  categories: [
    {
      id: 1,
      name: "Travel Enthusiast",
      icon: "fa-star",
    },
    {
      id: 2,
      name: "Food Lover",
      icon: "fa-music",
    },
  ],
  characteristics: ["Outgoing", "Nature Lover", "Photographer"],
  distance: 5.2,
  city: "New York",
  description:
    "❤️ Set hộp quà lọ điều ước thuỷ tinh là một lựa chọn tuyệt vời để thể hiện tình cảm và ý nghĩa đặc biệt trong những dịp lễ ❤️Mỗi chiếc hộp quà mang trong mình sự tinh tế và ý nghĩa, là một biểu tượng của tình yêu và hạnh phúc. Với bộ sản phẩm này, bạn có thể tặng cho bạn đời, bạn bè hoặc người thân để gửi gắm những lời chúc tốt đẹp và điều ước tươi đẹp cho họ.Set có hai màu sắc đa dạng để phù hợp với sở thích và phong cách của mỗi người. ♀️ Màu trắng tinh khôi thích hợp cho phụ nữ♂️ Màu đen sang trọng sẽ là lựa chọn lý tưởng cho phái mạnh.Sản phẩm bao gồm:⭐ Hộp đựng chất liệu cao cấp: Tinh tế và bền bỉ, giúp bảo quản các vật dụng bên trong an toàn.⭐ Lọ thuỷ tinh đẹp mắt: Thiết kế tỉ mỉ, tạo điểm nhấn độc đáo cho không gian.⭐ Giấy điều ước: Nơi để ghi lại những lời chúc ý nghĩa và những thông điệp yêu thương.⭐ Đèn tạo điểm nhấn lãng mạn: Làm tăng thêm sự ấm áp và sự thân mật.⭐ Thiệp lời chúc: Truyền đạt tình cảm và ý nghĩa của bạn đến người nhận.Hãy tạo dấu ấn và ghi lại những khoảnh khắc đáng nhớ với Set hộp quà lọ điều ước thuỷ tinh của chúng tôi. Hãy để tình yêu và sự quan tâm lan tỏa, mang lại niềm vui và hạnh phúc cho những người bạn yêu thương.#HopQuaLoDieuUoc #TinhYeuVaHanhPhuc #QuaTangYNghia #LoThuyTinhDepMat #HopQuaTinhTe #DenLangMan #ThiepLoiChuc #QuaTangDocDao #GuiGamLoiChuc #TaoDiemNhan #SetQuaLangMan #TangYeuThuong #HopQuaPhongCach #QuaTangThuyTinh #BoQuaTangDacBiet",
  images: [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
  ],
};
