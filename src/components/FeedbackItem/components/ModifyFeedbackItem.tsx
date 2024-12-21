import Button from "@/components/Buttons/Button";
import DeleteConfirmModal from "@/components/CustomModals/DeleteConfirmModal/DeleteConfirmModal";
import RatingModal from "@/components/CustomModals/RatingModal/RatingModal";
import { UpdateFeedbackParams } from "@/models/feedback.interface";
import {
  useDeleteFeedback,
  useUpdateFeedback,
} from "@/services/feedback.service";
import { isLoginSelector } from "@/store/auth/auth.selector";
import { FEEDBACK_QUERY_KEY } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface ModifyFeedbackItemProps {
  id: number;
  ratingProp: number;
  contentProp: string;
}

function ModifyFeedbackItem({
  id,
  ratingProp,
  contentProp,
}: ModifyFeedbackItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rating, setRating] = useState(ratingProp);
  const [comment, setComment] = useState(contentProp);
  const queryClient = useQueryClient();
  const isLogin = useSelector(isLoginSelector);

  useEffect(() => {
    document.body.style.overflow =
      isEditOpen || isDeleteOpen ? "hidden" : "auto";

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditOpen, isDeleteOpen]);

  const openUpdateModal = () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để sửa đánh giá");
      return;
    }
    setIsEditOpen(true);
  };

  const closeUpdateModal = () => {
    setIsEditOpen(false);
  };

  const openDeleteModal = () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để xoá đánh giá");
      return;
    }
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleRating = (index: number) => {
    setRating(index);
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const { isPending: isUpdatePending, mutateAsync: updateFeedback } =
    useUpdateFeedback();
  const { isPending: isDeletePending, mutateAsync: deleteFeedback } =
    useDeleteFeedback();

  const handleUpdateFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!rating) {
      toast.error("Vui lòng đánh giá số sao");
      return;
    }

    // Data to send to the server
    const data: UpdateFeedbackParams = {
      id,
      rating,
      content: comment,
    };

    await updateFeedback(data, {
      onSuccess: () => {
        // Invalidate query to refetch data
        queryClient.invalidateQueries({ queryKey: [FEEDBACK_QUERY_KEY] });
        closeUpdateModal();
      },
      onError: closeUpdateModal,
    });
  };

  const handleDeleteFeedback = () => {
    deleteFeedback(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [FEEDBACK_QUERY_KEY] });
        closeDeleteModal();
      },
      onError: closeDeleteModal,
    });
  };

  return (
    <>
      <Button
        padding="px-3 py-1.5"
        variant="ghost"
        className="text-xs font-medium"
        onClick={openUpdateModal}
      >
        Chỉnh sửa
      </Button>
      <Button
        padding="px-3 py-1.5"
        variant="ghost"
        className="text-xs font-medium"
        onClick={openDeleteModal}
      >
        Xoá
      </Button>
      <RatingModal
        isOpen={isEditOpen}
        onClose={closeUpdateModal}
        rating={rating}
        comment={comment}
        isPending={isUpdatePending}
        onSubmit={handleUpdateFeedback}
        onRatingChange={handleRating}
        onCommentChange={handleComment}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        handleDelete={handleDeleteFeedback}
        isPending={isDeletePending}
      />
    </>
  );
}

export default ModifyFeedbackItem;
