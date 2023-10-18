// @flow
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage,  } from 'formik';
import login_validate from '../lib/loginValidate';
import { register_validate } from '../lib/registerValidate';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import type { FormikProps } from 'formik';
import type { Node } from 'react';
type LoginRegisterModalProps = {
  show: boolean,
  onClose: () => void,
};

type LoginValues = {
  loginUsername: string;
  loginPassword: string;
};

type RegisterValues = {
  registerUsername: string;
  registerEmail: string;
  registerPassword: string;
  registerCpassword: string;
};



export default function LoginRegisterModal({
  show,
  onClose,
}: LoginRegisterModalProps): React$Element<any> {
  const isAndroid = Capacitor.getPlatform() === 'android';
  let regUrl;

  if (!isAndroid) {
    regUrl = 'http://localhost:9000/register';
  }

  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const switchForm = () => {
    setIsRegistering(!isRegistering);
  };

  type FormValues = LoginValues | RegisterValues;

  let initialValues: LoginValues;

  let initialValues2: RegisterValues;

  let initialValuesTrue
  if (isRegistering) {
    initialValuesTrue = initialValues2
  } else {
    initialValuesTrue = initialValues
  }

  const validate = isRegistering ? register_validate : login_validate;

  const handleSubmit = async (values: FormValues) => {

    
    const apiUrl = isRegistering ? '/api/register' : '/api/login';

    try {
      const options = {
        url: apiUrl,
        headers: { 'Content-Type': 'application/json', credentials: 'include' },
        data: JSON.stringify(values),
      };

      const response = await CapacitorHttp.post(options);

      if (response.status === 200) {
        console.log(isRegistering ? 'Registration successful' : 'Login successful');
        window.location.reload();
      } else {
        console.log(response);
        console.error(isRegistering ? 'Registration request failed' : 'Login request failed');
        // Handle registration/login failure, e.g., display an error message
      }
    } catch (error) {
      console.error(isRegistering ? 'Registration request error' : 'Login request error', error);
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
        <Formik<FormValues> initialValues={initialValuesTrue} onSubmit={handleSubmit} validate={validate}>
          {(formikProps: FormikProps<FormValues>) => (
            <Form onSubmit={formikProps.handleSubmit}>
              {isRegistering ? (
                <>
                  <Form.Group controlId="registerUsername">
                    <Form.Label>Username</Form.Label>
                    <Field type="text" name="registerUsername" as={Form.Control} placeholder="Enter username" />
                    <ErrorMessage name="registerUsername" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <Field type="email" name="registerEmail" as={Form.Control} placeholder="Enter email" />
                    <ErrorMessage name="registerEmail" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Field type="password" name="registerPassword" as={Form.Control} placeholder="Password" />
                    <ErrorMessage name="registerPassword" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="registerCpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Field type="password" name="registerCpassword" as={Form.Control} placeholder="Confirm password" />
                    <ErrorMessage name="registerCpassword" component="div" className="text-danger" />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Field type="text" name="loginUsername" as={Form.Control} placeholder="Enter your username" />
                    <ErrorMessage name="loginUsername" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Field type="password" name="loginPassword" as={Form.Control} placeholder="Enter your password" />
                    <ErrorMessage name="loginPassword" component="div" className="text-danger" />
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