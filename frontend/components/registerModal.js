//@flow
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { register_validate } from '../lib/registerValidate';
import { CapacitorHttp } from '@capacitor/core';
import type { FormikProps } from 'formik'; 
type RegisterModalProps = {
  show: boolean,
  onClose: () => void,
  switchForm: () => void,
};

type RegisterValues = {
  registerUsername: string | void;
  registerEmail: string | void;
  registerPassword: string | void;
  registerCpassword: string | void;
};

const RegisterModal = ({ show, onClose,switchForm}: RegisterModalProps ): React$Element<any> => {
  const initialValues: RegisterValues = {
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerCpassword: '',
  };

  const handleSubmit = async (values: RegisterValues) => {
  
    const apiUrl = '/api/register';

    try {
      const options = {
        url: apiUrl,
        headers: { 'Content-Type': 'application/json', credentials: 'include' },
        data: JSON.stringify(values),
      };

      const response = await CapacitorHttp.post(options);

      if (response.status === 200) {
        console.log('Registration successful' );
        window.location.reload();
      } else {
        console.log(response);
        console.error('Registration request failed');
       
      }
    } catch (error) {
      console.error(error,'Registration request error');
    }

    onClose();
  };

  const validate = register_validate;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {(formikProps: FormikProps<RegisterValues>) =>  (
            <Form onSubmit={formikProps.handleSubmit}>
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
              <Modal.Footer>
                <Button variant="secondary" onClick={switchForm}>
                  Already have an account?
                </Button>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
