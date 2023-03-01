import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "../users/usersSlice";
import contactsReducer from "../contacts/contactsSlice";
import conversationsReducer from "../conversations/conversationsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  users: usersReducer,
  contacts: contactsReducer,
  conversations: conversationsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
