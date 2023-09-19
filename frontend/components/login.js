import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function LoginRegisterModal({ show, onClose }) {
  const [isRegistering, setIsRegistering] = useState(false);

  // Function to switch between Login and Register forms
  const switchForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isRegistering ? 'Register' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Your login and registration forms here */}
        {isRegistering ? (
          <Form>
            {/* Registration form fields */}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="cpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
          </Form>
        ) : (
          <Form>
            {/* Login form fields */}
            <Form.Group controlId="usernameLogin">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" />
            </Form.Group>
            <Form.Group controlId="passwordLogin">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={switchForm}>
          {isRegistering ? 'Already have an account?' : 'Need an account?'}
        </Button>
        <Button variant="primary" onClick={onClose}>
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginRegisterModal;
