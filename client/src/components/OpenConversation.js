import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToConversation } from "../conversations/conversationsSlice";
import SendIcon from "./SendIcon";
import io from "socket.io-client";

export default function OpenConversation() {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const selectedConversationIndex = useSelector(
    (state) => state.conversations.selectedConversationIndex
  );
  const userId = useSelector((state) => state.users.id);
  const [text, setText] = useState("");
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:3001");
    socket.current.emit("join_room", userId);
  }, [socket, userId]);

  function handleSubmit(event) {
    event.preventDefault();
    socket.current.emit("send_message", {
      recipient: conversations[selectedConversationIndex].recipient,
      message: text,
    });
    dispatch(
      addMessageToConversation(
        conversations[selectedConversationIndex].recipient,
        text,
        userId
      )
    );

    setText("");
  }

  useEffect(() => {
    if (socket == null) return;

    socket.current.on("receive_message", (params) => {
      dispatch(
        addMessageToConversation(
          userId,
          params,
          conversations[selectedConversationIndex].recipient
        )
      );
    });

    return () => socket.current.off("receive_message");
  }, [socket.current]);

  return (
    <div className="d-flex flex-column flex-grow-1">
      {conversations[selectedConversationIndex]?.messages.map(
        (message, index) => {
          const lastMessage =
            conversations[selectedConversationIndex].messages.length - 1 ===
            index;
          const fromMe = message.senderId === userId;
          return (
            <div
              key={index}
              className={`my-1 d-flex flex-column ${
                fromMe ? "align-self-end align-items-end" : "align-items-start"
              }`}
            >
              <div
                className={`rounded px-2 py-1 ${
                  fromMe ? "bg-primary text-white" : "border"
                }`}
              >
                {message.text}
              </div>
              <div className={`text-muted small ${fromMe ? "text-right" : ""}`}>
                {fromMe ? "You" : message.senderName}
              </div>
            </div>
          );
        }
      )}
      <InputGroup className="mb-3 mt-auto">
        <Form.Control
          placeholder="Type a message"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Button
          variant="outline-secondary"
          type="submit"
          onClick={handleSubmit}
        >
          <SendIcon />
        </Button>
      </InputGroup>
    </div>
  );
}
