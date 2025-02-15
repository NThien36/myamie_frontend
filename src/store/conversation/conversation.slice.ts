// store/conversationsSlice.ts
import { Conversation, Message } from "@/models/message.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConversationsState {
  conversations: Conversation[];
}

const initialState: ConversationsState = {
  conversations: [], // Initialize with an empty array or fetch from API
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    // Replace the conversations list with a new one, only if it's different.
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      const newConversations = action.payload;

      // Check if the new conversations list is different by comparing IDs
      const currentIds = new Set(state.conversations.map((convo) => convo.id));
      const newIds = new Set(newConversations.map((convo) => convo.id));

      if (
        currentIds.size !== newIds.size ||
        [...newIds].some((id) => !currentIds.has(id))
      ) {
        state.conversations = newConversations;
      }
      // const isDifferent =
      //   state.conversations.length !== newConversations.length ||
      //   !newConversations.every((newConvo) =>
      //     state.conversations.some((existing) => existing.id === newConvo.id)
      //   );

      // if (isDifferent) {
      //   state.conversations = newConversations;
      // }
    },
    // Add new conversations without duplicating existing ones.
    addConversations: (state, action: PayloadAction<Conversation[]>) => {
      const existingIds = new Set(state.conversations.map((convo) => convo.id));
      const newConversations = action.payload.filter(
        (convo) => !existingIds.has(convo.id)
      );
      // Only update if there are new conversations to add
      if (newConversations.length) {
        // state.conversations = [...state.conversations, ...newConversations];
        state.conversations = state.conversations.concat(newConversations);
      }
    },
    // Update a conversation with a new message or create one if it doesn't exist.
    updateConversation: (
      state,
      action: PayloadAction<
        Message & { avatar: string; name: string; currentUserId: number }
      >
    ) => {
      const {
        currentUserId,
        senderId,
        receiverId,
        content,
        sentAt,
        avatar,
        name,
      } = action.payload;

      const conversationId = senderId === currentUserId ? receiverId : senderId;

      const existingConversationIndex = state.conversations.findIndex(
        (convo) => convo.id === conversationId
      );

      if (existingConversationIndex !== -1) {
        // Update the existing conversation
        const existingConversation =
          state.conversations[existingConversationIndex];

        const updatedConversation = {
          ...existingConversation,
          content,
          sentAt,
          senderId,
          isRead: senderId === currentUserId, // Mark unread if the message was sent by someone else
          // if the sender of the message is not the owner of the conversation (the other participant), the message is marked as unread
        };

        // // Move the updated conversation to the top
        // state.conversations.splice(existingConversationIndex, 1)[0];
        // state.conversations.unshift(updatedConversation);
        state.conversations = [
          updatedConversation,
          ...state.conversations.filter(
            (_, idx) => idx !== existingConversationIndex
          ),
        ];
      } else {
        // Create a new conversation if it doesn't exist
        const newConversation: Conversation = {
          id: conversationId,
          avatar,
          name,
          content,
          sentAt,
          senderId,
          isRead: senderId === currentUserId, // Mark unread for new conversations if sent by someone else
        };

        // Add the new conversation to the top
        state.conversations.unshift(newConversation);
      }
    },
    // Clear all conversations (e.g., on logout).
    clearConversations: (state) => {
      state.conversations = [];
    },
  },
});

export const {
  setConversations,
  addConversations,
  updateConversation,
  clearConversations,
} = conversationsSlice.actions;

const conversationsReducer = conversationsSlice.reducer;
export default conversationsReducer;
