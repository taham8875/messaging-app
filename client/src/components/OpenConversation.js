import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../conversations/conversationsSlice";
import SendIcon from "./SendIcon";

export default function OpenConversation() {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const selectedConversationIndex = useSelector(
    (state) => state.conversations.selectedConversationIndex
  );
  const [text, setText] = useState("");
  function handleSubmit(event) {
    event.preventDefault();

    dispatch(
      sendMessage(conversations[selectedConversationIndex].recipient, text)
    );

    setText("");
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      {conversations[selectedConversationIndex].messages.map(
        (message, index) => {
          const lastMessage =
            conversations[selectedConversationIndex].messages.length - 1 ===
            index;
          return (
            <div
              // ref={lastMessage ? setRef : null}
              key={index}
              className={`my-1 d-flex flex-column ${
                message.fromMe
                  ? "align-self-end align-items-end"
                  : "align-items-start"
              }`}
            >
              <div
                className={`rounded px-2 py-1 ${
                  message.fromMe ? "bg-primary text-white" : "border"
                }`}
              >
                {message.text}
              </div>
              <div
                className={`text-muted small ${
                  message.fromMe ? "text-right" : ""
                }`}
              >
                {message.fromMe ? "You" : message.senderName}
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
