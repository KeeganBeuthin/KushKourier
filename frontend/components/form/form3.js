//@flow
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import type { FormikProps } from 'formik'; 
import { legalVal} from '../../lib/formval/legalVal';
import { Form, Button } from 'react-bootstrap';
import { CapacitorHttp } from '@capacitor/core';

const validate = legalVal


type ProfileValues ={
    profileLegalName: string | void,
  }
  

  const initialValues: ProfileValues = {
    profileLegalName:'',
  };




const Form3 =(): React$Element<any> => {

    const handleSubmit = async (values: ProfileValues) => {
    
        const apiUrl = '/api/users/name';
      
     
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
    )
  }
  export default Form3