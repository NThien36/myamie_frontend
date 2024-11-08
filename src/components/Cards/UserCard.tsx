import { User } from "@/models/user.interface";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import IconText from "../IconText/IconText";
import Button from "../Buttons/Button";

function UserCard({ user }: { user: User }) {
  return (
    <Link
      to={`/user/${user.id}`}
      className="flex flex-col justify-between p-4 border-2 rounded-lg relative bg-white"
    >
      <div>
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="size-12"
            hasBorder={false}
          />
          <p className="text-base font-medium">{user.name}</p>
        </div>
        <p className="text-gray-500 line-clamp-3 lg:line-clamp-2 mt-2">
          {user.shortDescription}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mt-4">
          {user.characteristics.map((characteristic, index) => (
            <span
              key={index}
              className="border-2 border-primary py-1 px-3 rounded-full"
            >
              {characteristic}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 lg:gap-10 justify-end mt-3">
          <div className="flex flex-wrap gap-3 sm:gap-8">
            {user.city && <IconText icon="fa-location-dot" text={user.city} />}
            <IconText icon="fa-compass" text={`${user.distance} km`} />
          </div>
          <Button variant="outline" padding="px-4 py-1.5">
            Kết bạn
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
