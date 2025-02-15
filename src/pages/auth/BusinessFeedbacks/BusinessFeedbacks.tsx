// import { feedbackData } from "@/assets/data/feedback.data";
// import FeedbackItem from "@/components/FeedbackItem/FeedbackItem";
// import FilterSelects from "@/components/FilterSelects/FilterSelects";

// function BusinessFeedbacks() {
//   return (
//     <div>
//       <div className="space-y-3">
//         <FilterSelects
//           label="Trạng thái"
//           options={["Tất cả (90)", "Chưa phản hồi (90)", "Đã phản hồi (90)"]}
//         />
//         <FilterSelects
//           label="Số sao"
//           options={[
//             "Tất cả (90)",
//             "5 Sao (90)",
//             "4 Sao (90)",
//             "3 Sao (90)",
//             "2 Sao (90)",
//             "1 Sao (90)",
//           ]}
//         />
//         <FilterSelects label="Sắp xếp theo" options={["Mới nhất", "Cũ nhất"]} />
//       </div>
//       <div className="auth-container mt-5 space-y-10">
//         {feedbackData.map((feedback) => (
//           <FeedbackItem key={feedback.id} feedback={feedback} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BusinessFeedbacks;
