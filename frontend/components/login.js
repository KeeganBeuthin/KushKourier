import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import login_validate from '@/lib/validate';
import { Capacitor } from '@capacitor/core';
function LoginRegisterModal({ show, onClose }) {
  const isAndroid = Capacitor.getPlatform() === 'android';
let regUrl
  if(!isAndroid){
    regUrl = 'http://localhost:9000/register'
  }
  const [isRegistering, setIsRegistering] = useState(false);

  // Function to switch between Login and Register forms
  const switchForm = () => {
    setIsRegistering(!isRegistering);
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    cpassword: '',
    usernameLogin: '',
    passwordLogin: '',
  };

  const handleSubmit = async (values) => {

    let url
    if(isRegistering){
      url = '/api/register'
    } else {
      url = '/api/login'
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('Request successful');
        // Handle success, e.g., redirect or display a success message
      } else {
        console.error('Request failed');
        // Handle failure, e.g., display an error message
      }
    } catch (error) {
      console.error('Request error:', error);
      // Handle network error or other unexpected issues
    }

    onClose();
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isRegistering ? 'Register' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate= {login_validate}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {isRegistering ? (
                // Registration form fields
                <>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Field type="text" name="username" as={Form.Control} placeholder="Enter username" />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Field type="email" name="email" as={Form.Control} placeholder="Enter email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field type="password" name="password" as={Form.Control} placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="cpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Field type="password" name="cpassword" as={Form.Control} placeholder="Confirm password" />
                    <ErrorMessage name="cpassword" component="div" className="text-danger" />
                  </Form.Group>
                </>
              ) : (
                // Login form fields
                <>
                  <Form.Group controlId="usernameLogin">
                    <Form.Label>Username</Form.Label>
                    <Field type="text" name="usernameLogin" as={Form.Control} placeholder="Enter your username" />
                    <ErrorMessage name="usernameLogin" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="passwordLogin">
                    <Form.Label>Password</Form.Label>
                    <Field type="password" name="passwordLogin" as={Form.Control} placeholder="Enter your password" />
                    <ErrorMessage name="passwordLogin" component="div" className="text-danger" />
                  </Form.Group>
                </>
              )}
              <Modal.Footer>
                <Button variant="secondary" onClick={switchForm}>
                  {isRegistering ? 'Already have an account?' : 'Need an account?'}
                </Button>
                <Button variant="primary" type="submit">
                  {isRegistering ? 'Register' : 'Login'}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default LoginRegisterModal;
