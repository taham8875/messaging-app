import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selectedConversationIndex: null,
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addNewConversation: {
      reducer(state, action) {
        if (
          !current(state).conversations.find(
            (conversation) => conversation.recipient == action.payload.recipient
          )
        ) {
          state.conversations.push(action.payload);
        } else {
          window.alert("NO");
        }
      },
      prepare(selectedContactsId) {
        return {
          payload: {
            recipient: selectedContactsId,
            messages: [],
            selected: false,
          },
        };
      },
    },
    setSelectedConversation: {
      reducer(state, action) {
        state.selectedConversationIndex = action.payload.index;
      },
      prepare(index) {
        return {
          payload: {
            index: index,
          },
        };
      },
    },
    addMessageToConversation: {
      reducer(state, action) {
        state.conversations.forEach((conversation) => {
          if (
            conversation.recipient === action.payload.recipientId ||
            conversation.recipient === action.payload.senderId
          ) {
            conversation.messages.push({
              text: action.payload.text,
              recipientId: action.payload.recipientId,
              senderId: action.payload.senderId,
            });
          }
        });
      },
      prepare(recipientId, text, senderId) {
        return {
          payload: {
            recipientId: recipientId,
            text: text,
            senderId: senderId,
          },
        };
      },
    },
  },
});

export const {
  addNewConversation,
  setSelectedConversation,
  addMessageToConversation,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
