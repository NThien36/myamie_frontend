import { Business } from "@/models/business.interface";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Rate from "../Rate/Rate";
import IconText from "../IconText/IconText";
import getImageUrl from "@/utils/getImageUrl";

function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      to={ROUTE_PATH.BUSINESS_DETAIL}
      className="flex flex-col border-2 rounded-lg relative transition-shadow duration-300 hover:shadow-xl bg-white"
    >
      <img
        src={getImageUrl(business.cover, "cover")}
        alt={business.name}
        className="w-full min-h-40 h-40 object-cover rounded-t-md"
      />
      <div className="p-4 flex flex-col h-full justify-between">
        <div>
          <Avatar
            src={business.avatar}
            alt={business.name}
            className="-mt-14"
          />
          <p className="text-lg font-semibold mt-1 truncate">{business.name}</p>
          <p className="line-clamp-2 text-gray-500 mt-1">
            {business.shortDescription}
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Rate rate={business.rate} />
            <p className="text-gray-500">{business.totalFeedback} Đánh giá</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-between border-t mt-5 pt-4">
            {business.city && (
              <IconText
                icon="fa-location-dot"
                text={business.city}
                textClasses="text-xs"
              />
            )}
            {business.operatingHours && (
              <IconText
                icon="fa-clock"
                text={business.operatingHours}
                textClasses="text-xs"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
