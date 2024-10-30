import { ROUTE_PATH } from "./route-path";

// Common routes for all roles
const BASE_ROUTES = [
  {
    type: "HỒ SƠ",
    routes: [
      {
        path: ROUTE_PATH.SETTINGS,
        icon: "fa-circle-info",
        label: "Thông tin",
      },
      {
        path: ROUTE_PATH.ACCOUNT,
        icon: "fa-lock-keyhole",
        label: "Tài khoản",
      },
    ],
  },
];

// Role-based routes
export const ROLE_ROUTES = {
  USER: BASE_ROUTES,
  ADMIN: [
    {
      type: "QUẢN LÝ",
      routes: [
        {
          path: ROUTE_PATH.ADMIN_USERS,
          icon: "fa-user-group",
          label: "Người dùng",
        },
        {
          path: ROUTE_PATH.ADMIN_LOCATIONS,
          icon: "fa-earth-asia",
          label: "Địa điểm",
        },
      ],
    },
    {
      type: "HỒ SƠ",
      routes: [
        {
          path: ROUTE_PATH.ACCOUNT,
          icon: "fa-lock-keyhole",
          label: "Tài khoản",
        },
      ],
    },
  ],
  SERVICE: [
    {
      type: "QUẢN LÝ",
      routes: [
        {
          path: ROUTE_PATH.BUSINESS_OVERVIEW,
          icon: "fa-chart-simple",
          label: "Tổng quan",
        },
        {
          path: ROUTE_PATH.BUSINESS_FEEDBACK,
          icon: "fa-comment",
          label: "Đánh giá",
          number: 90, // Optional, could represent some count like feedbacks
        },
      ],
    },
    ...BASE_ROUTES, // Include common routes for SERVICE role
  ],
};
