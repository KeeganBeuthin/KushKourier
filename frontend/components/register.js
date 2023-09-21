import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import register_validate from '@/lib/validate';
import { Capacitor } from '@capacitor/core';


export default Register =({ show, onClose }) => {

    const initialValues1 = {
        username: '',
        email: '',
        password: '',
        cpassword: '',
      };

      const handleRegisterSubmit = async (values) => {

        const regUrl = '/api/register'
        try {
          const response = await fetch(regUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            console.log('Registration successful');
            // Handle success, e.g., redirect or display a success message
          } else {
            console.error('Registration request failed');
            // Handle registration failure, e.g., display an error message
          }
        } catch (error) {
          console.error('Registration request error:', error);
          // Handle network error or other unexpected issues
        }
    
        onClose();
      };


    return(
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>
        <Formik
          initialValues={initialValues1}
          onSubmit={handleRegisterSubmit}
          validate={register_validate}
        >
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
        </Formik>
      </>
      <Modal.Footer>
          <Button variant="primary" type="submit">
            {'Login'}
          </Button>
        </Modal.Footer>



      </Modal.Body>

    </Modal>
    )
}