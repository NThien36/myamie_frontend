import { RoleEnum } from "@/models/app.interface";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";
import { useSelector } from "react-redux";
import {
  accountRoleSelector,
  isLoginSelector,
} from "@/store/auth/auth.selector";

interface RoleRouteProps {
  allowedRoles: RoleEnum[];
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const isLoggedIn = useSelector(isLoginSelector);
  const role = useSelector(accountRoleSelector);

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace={true} />;
  }

  if (!role || !allowedRoles.includes(role as RoleEnum)) {
    return <Navigate to={ROUTE_PATH.BUSINESSES} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
