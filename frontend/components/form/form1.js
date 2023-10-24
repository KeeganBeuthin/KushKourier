//@flow
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import type { FormikProps } from 'formik'; 
import { username_validate} from '../../lib/formval/usernameValidate';
import { Form, Button } from 'react-bootstrap';
import { CapacitorHttp } from '@capacitor/core';

const validate = username_validate


type ProfileValues ={
    profileUsername: string | void,
  }
  

  const initialValues: ProfileValues = {
    profileUsername:'',
  };

const Form1 =(): React$Element<any> => {

    const handleSubmit = async (values: ProfileValues) => {
    
      const apiUrl = '/api/users';
    
      try {
        const options = {
          url: apiUrl,
          headers: {
            'Content-Type': 'application/json',
            'credentials': 'include',
            'authorization': 'include'
          },
          data:JSON.stringify(values)
        };
    
        const response = await CapacitorHttp(options);
    
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
    
    
    return (
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
    )
  }

  export default Form1