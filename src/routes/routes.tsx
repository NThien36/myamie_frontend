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
import SidebarLayout from "@/layouts/SidebarLayout";
import RoleRoute from "./RoleRoute";
import { RoleEnum } from "@/models/app.interface";
import Settings from "@/pages/auth/Settings/Settings";
import Account from "@/pages/auth/Account/Account";
import AdminUsers from "@/pages/auth/AdminUsers/AdminUsers";
import AdminPlaces from "@/pages/auth/AdminPlaces/AdminPlaces";
import ChatLayout from "@/layouts/ChatLayout";
import Chat from "@/pages/auth/Chat/Chat";
import NoChat from "@/pages/auth/Chat/components/NoChat";

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
      {
        path: ROUTE_PATH.FORBIDDEN,
        element: <Businesses />,
      },
      {
        path: "*",
        element: <Businesses />,
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
        path: ROUTE_PATH.SIGNUP,
        element: <Signup />,
      },
      {
        path: ROUTE_PATH.SIGNUP_BUSINESS,
        element: <SignupBusiness />,
      },
    ],
  },
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        element: (
          <RoleRoute
            allowedRoles={[RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.BUSINESS]}
          />
        ),
        children: [
          { path: ROUTE_PATH.SETTINGS, element: <Settings /> },
          { path: ROUTE_PATH.ACCOUNT, element: <Account /> },
        ],
      },
      // {
      //   element: <RoleRoute allowedRoles={[RoleEnum.BUSINESS]} />,
      //   children: [
      //     {
      //       path: ROUTE_PATH.BUSINESS_FEEDBACK,
      //       element: <BusinessFeedbacks />,
      //     },
      //   ],
      // },
      {
        element: <RoleRoute allowedRoles={[RoleEnum.ADMIN]} />,
        children: [
          {
            path: ROUTE_PATH.ADMIN_USERS,
            element: <AdminUsers />,
          },
          {
            path: ROUTE_PATH.ADMIN_PLACES,
            element: <AdminPlaces />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTE_PATH.CHAT,
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <NoChat />,
      },
      {
        path: ROUTE_PATH.CHAT_DETAIL,
        element: <Chat />,
      },
    ],
  },
]);

export default router;
