import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addNewContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, id) {
        return {
          payload: {
            name: name,
            id: id,
          },
        };
      },
    },
  },
});

export const { addNewContact } = contactsSlice.actions;

export default contactsSlice.reducer;
