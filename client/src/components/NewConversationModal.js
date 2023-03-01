import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewConversation } from "../conversations/conversationsSlice";

export default function NewConversationModal({ closeModal }) {
  const contacts = useSelector((state) => state.contacts.contacts);
  const [selectedContactId, setSelectedContactId] = useState([]);
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewConversation(selectedContactId));
    closeModal();
  }

  function handleCheckBoxChange(id) {
    setSelectedContactId(id);
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New Conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {contacts.map((contact) => (
            <Form.Check
              key={contact.id}
              type="radio"
              id={contact.id}
              name="selectContactsGroup"
              label={contact.name}
              value={selectedContactId == contact.id}
              onChange={() => handleCheckBoxChange(contact.id)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create New Conversation
        </Button>
      </Modal.Footer>
    </>
  );
}
