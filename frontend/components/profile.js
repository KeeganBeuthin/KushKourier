//@flow

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { validate_Profile } from '../lib/profileValidate';
import { Formik, Field, ErrorMessage } from 'formik';
import type { FormikProps } from 'formik'; 
import {CapacitorHttp} from '@capacitor/core';

type ProfileValues ={
  profileUsername: string | void,
  profilePassword: string | void,
  profileLegalName: string | void,
  profileEmail: string | void
}


const ProfilePage = ():React$Element<any> => {



  const initialValues: ProfileValues = {
    profileUsername:'',
    profileEmail:'',
    profilePassword:'',
    profileLegalName:'',
  };



const validate = validate_Profile


const handleSubmit = async (values: ProfileValues) => {
  
  const apiUrl = '/api/users';

  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
      },
      body: JSON.stringify(values),
    };

    const response = await fetch('/api/users', requestOptions);

    if (response.status === 200) {
      console.log('Registration successful');
    } else {
      const responseBody = await response.json();
      console.log(responseBody);
      console.error('Registration request failed');
    }
  } catch (error) {
    console.error(error, 'Registration request error');
  }
};


  const handlePasswordSubmit = (values: ProfileValues) => {


  };

  const handleEmailSubmit = (values: ProfileValues) => {
console.log('hello')
  
  };

  const handleLegalNameSubmit = (values: ProfileValues) => {

  }

  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <h1>Edit Profile</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
  {(formikProps: FormikProps<ProfileValues>) =>  (
      <Form onSubmit={formikProps.handleSubmit}>
          <>
            <Form.Group controlId="profileUsername">
              <Form.Label className='fw-bold'>Change Username</Form.Label>
              <Field type="text" name="profileUsername" as={Form.Control} placeholder="Enter username" />
              <ErrorMessage name="profileUsername" component="div" className="text-danger" />
            </Form.Group>
           
          </>
          <Button variant="primary" type="submit" className='mt-3'>
                  save username
          </Button>
      </Form>
    )}
  </Formik>
  <Formik initialValues={initialValues} onSubmit={handleEmailSubmit} validate={validate} >
  {(formikProps: FormikProps<ProfileValues>) =>  (
      <Form onSubmit={formikProps.handleSubmit}>
          <>
            <Form.Group controlId="profileEmail" className='mt-3'>
              <Form.Label className='fw-bold'>Change Email</Form.Label>
              <Field type="text" name="profileEmail" as={Form.Control} placeholder="somebody@example.com" />
              <ErrorMessage name="profileEmail" component="div" className="text-danger" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
                  save new email
                </Button>
          </>
      </Form>
    )}
  </Formik>
  <Formik initialValues={initialValues} onSubmit={handleLegalNameSubmit} validate={validate} >
  {(formikProps: FormikProps<ProfileValues>) =>  (
      <Form onSubmit={formikProps.handleSubmit}>
          <>
            <Form.Group controlId="profileLegalName" className='mt-3'>
              <Form.Label className='fw-bold'>Change Legal Name</Form.Label>
              <Field type="text" name="profileLegalName" as={Form.Control} placeholder="Michael Jordan" />
              <ErrorMessage name="profileLegalName" component="div" className="text-danger" />
            </Form.Group>
            <div className='d-flex flex-row'>
            <Button variant="primary" type="submit" className='mt-3'>
                 Change Name
                </Button>
                <p className='fs-6 pt-2 ps-5'>* Legal name is required for checkout</p>
                </div>
          </>
      </Form>
    )}
  </Formik>
  <Formik initialValues={initialValues} onSubmit={handlePasswordSubmit} validate={validate} >
  {(formikProps: FormikProps<ProfileValues>) =>  (
      <Form onSubmit={formikProps.handleSubmit}>
          <>
            <Form.Group controlId="profilePassword" className='mt-3'>
              <Form.Label className='fw-bold'>Change Password</Form.Label>
              <Field type="text" name="profilePassword" as={Form.Control} placeholder="********" />
              <ErrorMessage name="profilePassword" component="div" className="text-danger" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
                  Change Password
                </Button>
          </>
      </Form>
    )}
  </Formik>
    </Row>
    </Container>
  );
};










export default ProfilePage;
