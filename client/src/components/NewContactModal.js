import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewContact } from "../contacts/contactsSlice";

export default function NewContactModal({ closeModal }) {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const idRef = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewContact(nameRef.current.value, idRef.current.value));
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" autoFocus ref={nameRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>id</Form.Label>
            <Form.Control type="text" ref={idRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create New Contact
        </Button>
      </Modal.Footer>
    </>
  );
}
