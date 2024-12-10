import { notFound } from "@/assets/images";
import cx from "classnames";

interface NotFoundProps {
  className?: string;
  type?: "user" | "business" | "place";
}

function NotFound({ className, type }: NotFoundProps) {
  const messages = {
    user: "Rất tiếc, MYAmie không tìm thấy người bạn này",
    business: "Rất tiếc, MYAmie không tìm thấy dịch vụ này",
    place: "Rất tiếc, MYAmie không tìm thấy địa điểm này",
    default: "Rất tiếc, MYAmie không tìm thấy trang này",
  };

  return (
    <div className={cx("flex flex-col items-center", className)}>
      <img src={notFound} alt="" className="w-60 h-fit" />
      <p className="text-center text-base font-medium text-primary">
        {messages[type || "default"]}
        <br />
        Bạn iu hãy thử lại sau nhé
      </p>
    </div>
  );
}

export default NotFound;
