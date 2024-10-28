import DefaultLayout from "@/layouts/DefaultLayout";
import Businesses from "@/pages/non-auth/Businesses/Businesses";
import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";
import Places from "@/pages/non-auth/Places/Places";
import Users from "@/pages/non-auth/Users/Users";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/non-auth/Login/Login";
import Signup from "@/pages/non-auth/Signup/Signup";
import SignupBusiness from "@/pages/non-auth/Signup/SignupBusiness";
import UserProfile from "@/pages/non-auth/Profile/UserProfile";
import BusinessProfile from "@/pages/non-auth/Profile/BusinessProfile";
import PlaceProfile from "@/pages/non-auth/Profile/PlaceProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Businesses />,
      },
      {
        path: ROUTE_PATH.PLACES,
        element: <Places />,
      },
      {
        path: ROUTE_PATH.USERS,
        element: <Users />,
      },
      {
        path: ROUTE_PATH.USER_DETAIL,
        element: <UserProfile />,
      },
      {
        path: ROUTE_PATH.BUSINESS_DETAIL,
        element: <BusinessProfile />,
      },
      {
        path: ROUTE_PATH.PLACE_DETAIL,
        element: <PlaceProfile />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: ROUTE_PATH.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTE_PATH.REGISTER,
        element: <Signup />,
      },
      {
        path: ROUTE_PATH.REGISTER_BUSINESS,
        element: <SignupBusiness />,
      },
    ],
  },
]);

export default router;
