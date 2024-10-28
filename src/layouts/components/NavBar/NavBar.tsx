import Logo from "@/assets/images/Logo";
import Button from "@/components/Buttons/Button";
import { ROUTE_PATH } from "@/routes/route-path";
import cx from "classnames";
import { Link, NavLink } from "react-router-dom";

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
  return (
    <div className="container px-7 flex justify-between items-center py-6">
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
      <div className="space-x-6">
        <Link to={ROUTE_PATH.REGISTER_BUSINESS} className="font-medium">
          Kinh doanh
        </Link>
        <Button shape="rounded" to={ROUTE_PATH.LOGIN}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
