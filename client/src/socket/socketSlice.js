import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: {
      reducer(state, action) {
        state.socket = action.payload.newSocket;
      },
      prepare(id) {
        const newSocket = io("http://localhost:5000", {
          query: { id },
          transports: ["websocket", "polling", "flashsocket"],
        });
        return {
          payload: {
            newSocket: newSocket,
          },
        };
      },
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
