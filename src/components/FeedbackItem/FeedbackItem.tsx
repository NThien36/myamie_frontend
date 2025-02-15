import { Feedback } from "@/models/feedback.interface";
import Avatar from "../Avatar/Avatar";
import Divider from "../Divider/Divider";
import Rate from "../Rate/Rate";
import Button from "../Buttons/Button";
import CustomModal from "../Modals/CustomModal";
import { useEffect, useState } from "react";
import Textarea from "../Input/Textarea";
import { useSelector } from "react-redux";
import { accountIdSelector } from "@/store/auth/auth.selector";
import { useResponseFeedback } from "@/services/feedback.service";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FEEDBACK_QUERY_KEY } from "@/utils/constants";
import ModifyFeedbackItem from "./components/ModifyFeedbackItem";

interface FeedbackItemProps {
  feedback: Feedback;
}

function FeedbackItem({ feedback }: FeedbackItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState<string>("");
  const curUserId = useSelector(accountIdSelector);
  const queryClient = useQueryClient();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Manage body overflow for modals
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const { isPending, mutateAsync } = useResponseFeedback();

  const handleUpdateSubmit = async () => {
    if (!response) {
      toast.error("Vui lòng nhập phản hồi");
      return;
    }

    await mutateAsync(
      {
        id: feedback.id,
        message: response,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [FEEDBACK_QUERY_KEY],
          });
        },
      }
    );
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-none gap-3 w-full sm:w-44">
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
        <Divider className="hidden sm:block" />
        <div className="w-full">
          <Rate rate={feedback.rating} />
          <p className="mt-2">{feedback.content}</p>
          {feedback.response ? (
            <div className="p-4 bg-gray-100 mt-4 rounded-md">
              <p className="text-xs text-gray-500">Phản hồi từ người chủ</p>
              <p className="mt-2">{feedback.response}</p>
            </div>
          ) : (
            <div className="mt-4 flex gap-2">
              {curUserId === feedback.senderId && (
                <ModifyFeedbackItem
                  id={feedback.id}
                  ratingProp={feedback.rating}
                  contentProp={feedback.content}
                />
              )}
              {curUserId === feedback.targetId && (
                <Button
                  padding="px-3 py-1.5"
                  variant="ghost"
                  className="text-xs font-medium"
                  onClick={openModal}
                >
                  Trả lời
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onActiveClick={handleUpdateSubmit}
        saveButtonTitle="Trả lời"
        isPending={isPending}
        title="Trả lời đánh giá"
        className="w-11/12 md:w-1/2"
      >
        <p>
          <span className="font-medium">Số sao: </span>
          {feedback.rating}
        </p>
        <p>
          <span className="font-medium">Đánh giá: </span>
          {feedback.content}
        </p>
        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          label="Phản hồi"
          placeholder="Nhập phản hồi tại đây"
        />
        <p className="text-red-600 text-xs leading-5">
          (*) Sau khi phản hồi, người đánh giá sẽ không thể chỉnh sửa hay xoá.
          Nếu đánh giá này khiến bạn chưa thoải mái, vui lòng liên lạc với đối
          tượng để chỉnh sửa.
        </p>
      </CustomModal>
    </>
  );
}

export default FeedbackItem;
