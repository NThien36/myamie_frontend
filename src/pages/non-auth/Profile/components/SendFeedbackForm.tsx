import Button from "@/components/Buttons/Button";
import RatingModal from "@/components/CustomModals/RatingModal/RatingModal";
import { FeedbackTargetType } from "@/models/app.interface";
import { AddFeedbackParams } from "@/models/feedback.interface";
import { useAddFeedback } from "@/services/feedback.service";
import { isLoginSelector } from "@/store/auth/auth.selector";
import { FEEDBACK_QUERY_KEY } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface SendFeedbackFormProps {
  id: number;
}

function SendFeedbackForm({ id }: SendFeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient(); // Query client for invalidating queries
  const isLogin = useSelector(isLoginSelector);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const openModal = () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để viết đánh giá");
      return;
    }
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setRating(0); // Reset rating when modal closes
    setComment(""); // Reset comment when modal closes
  };

  const handleRating = (index: number) => {
    setRating(index);
  };

  const { isPending, mutateAsync } = useAddFeedback();

  const handleSendFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!rating) {
      toast.error("Vui lòng đánh giá số sao");
      return;
    }

    // Data to send to the server
    const data: AddFeedbackParams = {
      targetId: id,
      targetType: FeedbackTargetType.BUSINESS,
      rating,
      content: comment,
    };

    await mutateAsync(data, {
      onSuccess: () => {
        // Invalidate query to refetch data
        queryClient.invalidateQueries({ queryKey: [FEEDBACK_QUERY_KEY] });
        closeModal();
      },
      onError: closeModal,
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-xs font-medium"
        onClick={openModal}
      >
        Viết đánh giá
      </Button>
      <RatingModal
        isOpen={isOpen}
        onClose={closeModal}
        rating={rating}
        comment={comment}
        isPending={isPending}
        onSubmit={handleSendFeedback}
        onRatingChange={handleRating}
        onCommentChange={(e) => setComment(e.target.value)}
      />
    </>
  );
}

export default SendFeedbackForm;
