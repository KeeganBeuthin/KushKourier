//@flow
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import type { FormikProps } from 'formik'; 
import { passVal} from '../../lib/formval/passval';
import { Form, Button } from 'react-bootstrap';
import { CapacitorHttp } from '@capacitor/core';

const validate = passVal


type ProfileValues ={
    profilePassword: string | void,
  }
  

  const initialValues: ProfileValues = {
    profilePassword:'',
  };



const Form4=(): React$Element<any>=> {


    const handleSubmit = async (values: ProfileValues) => {
    
        const apiUrl = '/api/users/email';
      
        try {
            const options = {
              url: apiUrl,
              headers: {
                'Content-Type': 'application/json',
                'credentials': 'include',
                'authorization': 'include'
              },
              body:JSON.stringify(values)
            };
        
            const response = await CapacitorHttp.post(options);
      
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
  <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate} >
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
    )
  }
  export default Form4