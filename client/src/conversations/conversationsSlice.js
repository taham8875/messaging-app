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
    sendMessage: {
      reducer(state, action) {
        state.conversations.forEach((conversation) => {
          if (conversation.recipient === action.payload.recipientId) {
            conversation.messages.push({
              text: action.payload.text,
              fromMe: true,
            });
          }
        });
      },
      prepare(recipientId, text) {
        return {
          payload: {
            recipientId: recipientId,
            text: text,
          },
        };
      },
    },
  },
});

export const { addNewConversation, setSelectedConversation, sendMessage } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
