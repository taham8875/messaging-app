import React, { useRef } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setId } from "./usersSlice";
import { Buffer } from "buffer";

export default function Login() {
  const idRef = useRef();

  const id = useSelector((state) => state.users.id);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(setId(idRef.current.value));
  }

  function createNewId(event) {
    event.preventDefault();
    let newId = uuidv4();
    newId = newId.replace(/-/g, "");
    newId = newId.substring(0, 6);
    dispatch(setId(newId));
  }

  return (
    <Container>
      <Row className="  align-items-center vh-100">
        <div className="col-12 col-md-6">
          id: {id}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Id"
                ref={idRef}
                required
              />
            </Form.Group>
            <Button className="me-2" variant="primary" type="submit">
              Login
            </Button>
            <Button variant="secondary" type="submit" onClick={createNewId}>
              Get A New id
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
