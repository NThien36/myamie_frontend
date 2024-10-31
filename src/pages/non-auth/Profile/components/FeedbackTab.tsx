import { feedbackData } from "@/assets/data/feedback.data";
import Divider from "@/components/Divider/Divider";
import Dropdown from "@/components/Dropdown/Dropdown";
import FeedbackItem from "@/components/FeedbackItem/FeedbackItem";
import Pagination from "@/components/Pagination/Pagination";
import Rate from "@/components/Rate/Rate";

function FeedbackTab() {
  return (
    <>
      <div className="p-6 border-2 rounded-xl bg-white flex justify-between">
        <div className="flex gap-7">
          <div>
            <p className="text-base text-gray-500 font-medium">
              Tổng lượt đánh giá
            </p>
            <p className="text-4xl font-medium mt-1">20</p>
          </div>
          <Divider />
          <div>
            <p className="text-base text-gray-500 font-medium">
              Tỷ lệ đánh giá
            </p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-4xl font-medium">4.5</p>
              <div className="">
                <Rate rate={4.5} />
                <p className="text-xs font-medium text-gray-500 mt-1">
                  Trên tổng lượt đánh giá
                </p>
              </div>
            </div>
          </div>
        </div>
        <Dropdown
          placeHolder="Bộ lọc"
          options={[
            { name: "Mới nhất", id: 1 },
            { name: "Cũ nhất", id: 2 },
          ]}
          className="w-36"
        />
      </div>
      <div className="p-6 space-y-10">
        {feedbackData.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </div>
      <Pagination currentPage={1} totalPage={10} onPageChange={() => "f"} />
    </>
  );
}

export default FeedbackTab;
