import { Place } from "@/models/place.interface";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import IconText from "../IconText/IconText";

function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      to={ROUTE_PATH.PLACE_DETAIL}
      className="flex flex-col border-2 rounded-lg relative transition-shadow duration-300 hover:shadow-xl bg-white"
    >
      <img
        src={place.cover}
        alt={place.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4 h-full flex flex-col justify-between">
        <div>
          <p className="text-lg font-semibold truncate">{place.name}</p>
          <p className="line-clamp-3 text-gray-500 leading-snug mt-2">
            {place.shortDescription}
          </p>
        </div>
        <div className="flex justify-between items-end mt-5 gap-7">
          <div className="flex items-center gap-2 truncate">
            <Avatar
              hasBorder={false}
              src={place.ownerAvatar}
              alt={place.ownerName}
              size="size-11"
            />
            <div className="truncate">
              <p className="font-medium truncate">{place.ownerName}</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                {place.dateCreated}
              </p>
            </div>
          </div>
          <IconText
            icon="fa-location-dot"
            text={place.city}
            textClasses="text-xs"
          />
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
