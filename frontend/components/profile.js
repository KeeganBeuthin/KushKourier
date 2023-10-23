import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { validateProfile } from '../lib/profileValidate';
import { Formik, Field, ErrorMessage } from 'formik';
import type { FormikProps } from 'formik'; 

const ProfilePage = () => {

  type profileValues ={
     profileUsername: string,
     profilePassword: string,
     profileLegalName: string,
     profileEmail: string
  }

  const handleUsernameSubmit = (values: validateProfile) => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: formData.username }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Username updated successfully');
        } else {
          console.error('Failed to update username');
        }
      })
      .catch((error) => {
     
        console.error('Network error:', error);
      });
  };

  const handlePasswordSubmit = () => {


  };

  const handleEmailSubmit = () => {

  
  };

  return (
    <Container className="mt-5 ">
      <Row className="mt-5  d-flex justify-content-center">

          <h1>Edit Profile</h1>
          <Form>
            <Form.Group controlId="username" className='d-inline-flex pt-4'>
              <Form.Label className='pe-3 pt-3'>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Button variant="primary" type="submit" onClick={handleUsernameSubmit} className='ms-3'>
                Save Username
              </Button>
            </Form.Group>
          </Form>
          <Form className='pt-4'>
            <Form.Group controlId="newPassword" className='d-inline-flex pt-4'>
              <Form.Label className='pe-3'>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <Button variant="primary" type="submit" onClick={handlePasswordSubmit} className='ms-3'>
                Save Password
              </Button>
            </Form.Group>
          </Form>
          <Form className='pt-4'>
            <Form.Group controlId="email" className='d-inline-flex pt-4'>
              <Form.Label className='pe-3 pt-3'>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Button variant="primary" type="submit" onClick={handleEmailSubmit}>
                Save Email
              </Button>
            </Form.Group>
          </Form>
    
      </Row>
    </Container>
  );
};

export default ProfilePage;
