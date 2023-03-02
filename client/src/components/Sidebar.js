import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Nav,
  Row,
  Col,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";
import { setSelectedConversation } from "../conversations/conversationsSlice";

const CONVERSTATION_KEY = "conversation";
const CONTACTS_KEY = "contact";

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(CONVERSTATION_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }
  const id = useSelector((state) => state.users.id);
  const contacts = useSelector((state) => state.contacts.contacts);
  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversationIndex
  );
  const dispatch = useDispatch();
  return (
    <div className="">
      <Tab.Container
        className="border-end overflow-auto    col-12 m-0"
        activeKey={activeKey}
        onSelect={setActiveKey}
      >
        <Row className="  border-end overflow-auto    col-12 m-0">
          <div className="vh-100 d-flex flex-column">
            <Nav variant="tabs" className="">
              <Nav.Item>
                <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={CONVERSTATION_KEY}>Conversations</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="flex-grow-1 p-2">
              <Tab.Pane eventKey={CONTACTS_KEY}>
                <ListGroup variant="flush">
                  {contacts.map((contact) => (
                    <ListGroup.Item key={contact.id}>
                      {contact.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane eventKey={CONVERSTATION_KEY}>
                <ListGroup variant="flush">
                  {conversations.map((conversation, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      active={selectedConversation === index}
                      onClick={() => dispatch(setSelectedConversation(index))}
                    >
                      {
                        contacts.find(
                          (contact) => contact.id === conversation.recipient
                        ).name
                      }
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
            <div className="small p-2 border-top border-end">
              Your id : <span className="text-muted">{id}</span>
            </div>
            <Button className="rounded-0" onClick={() => setModalOpen(true)}>
              New {activeKey}
            </Button>
          </div>
        </Row>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "contact" ? (
          <NewContactModal closeModal={closeModal} />
        ) : (
          <NewConversationModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
