import { RoleEnum } from "@/models/app.interface";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";

interface RoleRouteProps {
  allowedRoles: RoleEnum[];
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const token = "cccccccc";
  const role = "ADMIN";

  if (!token) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  }

  if (!role || !allowedRoles.includes(role as RoleEnum)) {
    return <Navigate to={ROUTE_PATH.FORBIDDEN} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
