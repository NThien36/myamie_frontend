import { noAvatar } from "@/assets/images";
import Logo from "@/assets/images/Logo";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Buttons/Button";
import { ROUTE_PATH } from "@/routes/route-path";
import cx from "classnames";
import { Link, NavLink } from "react-router-dom";
import ProfileOptions from "../ProfileOptions/ProfileOptions";

const navlinks = [
  {
    id: 1,
    name: "Dịch vụ",
    href: ROUTE_PATH.BUSINESSES,
  },
  {
    id: 2,
    name: "Địa điểm",
    href: ROUTE_PATH.PLACES,
  },
  {
    id: 3,
    name: "Bạn bè",
    href: ROUTE_PATH.USERS,
  },
];

function NavBar() {
  const isLogged = true;

  return (
    <div
      className={cx("container px-7 flex justify-between items-center", {
        "py-4": isLogged,
        "py-6": !isLogged,
      })}
    >
      <div className="space-x-7 font-medium">
        {navlinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) => cx({ "text-primary": isActive })}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <Link
        to={ROUTE_PATH.BUSINESSES}
        className="absolute right-0 left-0 w-fit mx-auto"
      >
        <Logo />
      </Link>
      {isLogged ? (
        <div className="flex gap-3 items-center">
          <Link
            to={ROUTE_PATH.CHAT}
            className="hover:bg-gray-100 border border-gray-400 rounded-full size-10 flex items-center justify-center"
          >
            <i className="text-primary fa-lg fa-solid fa-comments"></i>
          </Link>
          <ProfileOptions />
        </div>
      ) : (
        <div className="space-x-6">
          <Link to={ROUTE_PATH.REGISTER_BUSINESS} className="font-medium">
            Kinh doanh
          </Link>
          <Button shape="rounded" to={ROUTE_PATH.LOGIN}>
            Đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
