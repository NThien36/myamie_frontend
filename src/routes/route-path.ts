export const ROUTE_PATH = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/signup",
  REGISTER_BUSINESS: "/signup-business",

  // Public
  BUSINESSES: "/",
  BUSINESS_DETAIL: "/service/:id",
  PLACES: "/places",
  PLACE_DETAIL: "/place/:id",
  USERS: "/users",
  USER_DETAIL: "/user/:id",

  // Chat
  CHAT: "/chat",
  CHAT_DETAIL: "/chat/:id",

  // private common
  SETTINGS: "/info",
  ACCOUNT: "/account",
  // admin
  ADMIN_USERS: "/admin-users",
  ADMIN_LOCATIONS: "/admin-locations",
  // service
  BUSINESS_OVERVIEW: "/overview",
  BUSINESS_FEEDBACK: "/service-feedback",

  // Forbidden - 403
  FORBIDDEN: "/forbidden",
};
