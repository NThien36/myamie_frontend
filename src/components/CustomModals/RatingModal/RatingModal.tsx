import Button from "@/components/Buttons/Button";
import Textarea from "@/components/Input/Textarea";
import ConfirmModal from "@/components/Modals/ConfirmModal";

interface RatingModalProps {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  comment: string;
  isPending: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onRatingChange: (index: number) => void;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function RatingModal({
  isOpen,
  onClose,
  rating,
  comment,
  isPending,
  onSubmit,
  onRatingChange,
  onCommentChange,
}: RatingModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      className="w-11/12 sm:w-1/2 xl:w-1/3"
    >
      <form onSubmit={onSubmit}>
        <div className="flex text-2xl gap-1 text-yellow-300 mb-5 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa-star ${
                star <= rating ? "fa-solid" : "fa-light"
              } cursor-pointer`}
              onClick={() => onRatingChange(star)}
            ></i>
          ))}
        </div>
        <Textarea
          value={comment}
          onChange={onCommentChange}
          placeholder="Nhập đánh giá của bạn"
          label="Bình luận"
        />
        <div className="flex gap-3 mt-5">
          <Button
            type="button"
            className="w-full"
            variant="ghost"
            onClick={onClose}
          >
            Trở lại
          </Button>
          <Button type="submit" className="w-full">
            {isPending ? "Đang gửi..." : "Gửi đánh giá"}
          </Button>
        </div>
      </form>
    </ConfirmModal>
  );
}

export default RatingModal;
