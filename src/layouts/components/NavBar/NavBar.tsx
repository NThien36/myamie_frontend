import Logo from "@/assets/images/Logo";
import Button from "@/components/Buttons/Button";
import { ROUTE_PATH } from "@/routes/route-path";
import cx from "classnames";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileOptions from "../ProfileOptions/ProfileOptions";
import { useState } from "react";
import "./NavBar.css";
import useClickOutside from "@/hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector, isLoginSelector } from "@/store/auth/auth.selector";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/store/auth/auth.slice";
import { RoleEnum } from "@/models/app.interface";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const queryClient = useQueryClient();
  const isLoggedIn = useSelector(isLoginSelector);
  const account = useSelector(accountSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const dropdownRef = useClickOutside(() => setShowDropdown(false));

  const handleLogout = () => {
    queryClient.clear();
    dispatch(logout());
    navigate(0);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className={cx(
          "container px-3 md:px-7 flex justify-between items-center",
          {
            "py-4": isLoggedIn,
            "py-6": !isLoggedIn,
          }
        )}
      >
        <div className="hidden md:block space-x-7 font-medium">
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
        <button className="block md:hidden" onClick={toggleDropdown}>
          <i className="fa-2xl fa-solid fa-bars-sort"></i>
        </button>
        <Link
          to={ROUTE_PATH.BUSINESSES}
          className="absolute right-0 left-0 w-fit mx-auto"
        >
          <Logo />
        </Link>
        {isLoggedIn ? (
          <div className="hidden md:flex gap-3 items-center">
            <Link
              to={ROUTE_PATH.CHAT}
              className="hover:bg-gray-100 border border-gray-400 rounded-full size-10 flex items-center justify-center"
            >
              <i className="text-primary fa-lg fa-solid fa-comments"></i>
            </Link>
            <ProfileOptions
              accountId={account.id}
              src={account.avatar}
              name={`${account.lastName ?? ""} ${account.firstName ?? ""}`}
            />
          </div>
        ) : (
          <div className="hidden md:block space-x-6">
            <Link to={ROUTE_PATH.SIGNUP_BUSINESS} className="font-medium">
              Kinh doanh
            </Link>
            <Button shape="rounded" to={ROUTE_PATH.LOGIN}>
              Đăng nhập
            </Button>
          </div>
        )}
      </div>
      {showDropdown && (
        <div className="animate-slide-down absolute bg-background shadow-2xl w-full px-5 py-8 flex flex-col gap-5 text-lg font-medium z-10">
          <Link to={ROUTE_PATH.BUSINESSES} className="hover:underline">
            Dịch vụ
          </Link>
          <Link to={ROUTE_PATH.PLACES} className="hover:underline">
            Địa điểm
          </Link>
          <Link to={ROUTE_PATH.USERS} className="hover:underline">
            Bạn bè
          </Link>
          {isLoggedIn ? (
            <>
              <Link to={ROUTE_PATH.CHAT} className="hover:underline">
                Tin nhắn
              </Link>
              {account.role === RoleEnum.BUSINESS ? (
                <Link to={`/service/${account.id}`} className="hover:underline">
                  Trang cá nhân
                </Link>
              ) : account.role === RoleEnum.ADMIN ? (
                <Link to={ROUTE_PATH.ADMIN_USERS} className="hover:underline">
                  Quản trị viên
                </Link>
              ) : (
                <Link to={`/user/${account.id}`} className="hover:underline">
                  Trang cá nhân
                </Link>
              )}
              <Link to={ROUTE_PATH.ACCOUNT} className="hover:underline">
                Thông tin
              </Link>
              <p onClick={handleLogout} className="hover:underline">
                Đăng xuất
              </p>
            </>
          ) : (
            <>
              <Link to={ROUTE_PATH.SIGNUP_BUSINESS} className="hover:underline">
                Kinh doanh
              </Link>
              <Link to={ROUTE_PATH.LOGIN} className="hover:underline">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
