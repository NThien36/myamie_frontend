import { Feedback } from "@/models/feedback.interface";
import Avatar from "../Avatar/Avatar";
import Divider from "../Divider/Divider";
import Rate from "../Rate/Rate";
import Button from "../Buttons/Button";
import CustomModal from "../Modals/CustomModal";
import { useState } from "react";
import Textarea from "../Input/Textarea";

interface FeedbackItemProps {
  feedback: Feedback;
}

function FeedbackItem({ feedback }: FeedbackItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex gap-5">
        <div className="flex flex-none gap-3 w-44">
          <Avatar
            src={feedback.avatar}
            alt={feedback.name}
            hasBorder={false}
            size="size-11"
          />
          <div>
            <p className="font-medium">{feedback.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {feedback.dateCreated}
            </p>
          </div>
        </div>
        <Divider />
        <div className="w-full">
          <Rate rate={feedback.rating} />
          <p className="mt-2">{feedback.content}</p>
          {feedback.response ? (
            <div className="p-4 bg-gray-100 rounded-md mt-4">
              <p className="text-xs text-gray-500">Phản hồi từ người chủ</p>
              <p className="mt-2">{feedback.response}</p>
            </div>
          ) : (
            <Button
              padding="px-3 py-1.5"
              variant="ghost"
              className="text-xs mt-4 font-medium"
              onClick={openModal}
            >
              Trả lời
            </Button>
          )}
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        saveButtonTitle="Trả lời"
        title="Trả lời đánh giá"
      >
        <p>
          <span className="font-medium">Đánh giá: </span>
          {feedback.content}
        </p>
        <Textarea label="Phản hồi" placeholder="Nhập phản hồi tại đây" />
      </CustomModal>
    </>
  );
}

export default FeedbackItem;
