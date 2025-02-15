import cx from "classnames";

interface RateProps {
  rate: number;
}

function Rate({ rate }: RateProps) {
  const roundedRating = Math.round(rate);

  return (
    <div className="text-yellow-400 space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <i
          key={index}
          className={cx({
            "fa-solid fa-star": index < roundedRating,
            "fa-regular fa-star": index >= roundedRating,
          })}
        ></i>
      ))}
    </div>
  );
}

export default Rate;
