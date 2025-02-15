import { AppState } from "../store";

export const conversationsSelector = (state: AppState) =>
  state.conversations.conversations;
