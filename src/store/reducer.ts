import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import conversationsReducer from "./conversation/conversation.slice";

const reducers = {
  conversations: conversationsReducer,
  auth: authReducer,
};

export default combineReducers(reducers);
