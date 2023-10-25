//@flow
import React, {useRef,useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { CapacitorHttp } from '@capacitor/core';
import type { FormikProps } from 'formik'; 
const validate = (values) => {
  const errors = {};

  if (!values.imageUrl) {
    errors.imageUrl = 'Image URL is required';
  }
  if (!values.productName) {
    errors.productName = 'Product Name is required';
  }
  if (!values.productCategory) {
    errors.productCategory = 'Product Category is required';
  }
  if (isNaN(values.productStock)) {
    errors.productStock = 'Product Stock must be a number';
  }
  if (isNaN(values.productPrice)) {
    errors.productPrice = 'Product Price must be a number';
  }

  return errors;
};

type AdminForm1 = {
    show: boolean,
    onClose: () => void,
  };

type ProductValues = {
  imageUrl: string | void,
  productName: string | void,
  productCategory: string | void,
  productStock: string | void,
  productPrice: string | void,
};

const initialValues: ProductValues = {
  imageUrl: '',
  productName: '',
  productCategory: '',
  productStock: '',
  productPrice: '',
};

const AdminForm1 = ({ show, onClose}: AdminForm1): React$Element<any> => {

    const [selectedFiles, setSelectedFiles] = useState([]);


    const fileInputRef = useRef(null);


    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        e.target.value = null;
      };
     
      const removeFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
      };

  const handleSubmit = async (values: ProductValues) => {
    const apiUrl = '/api/products'; // Change to your product API endpoint

    try {
      const options = {
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include',
          'authorization': 'include',
        },
        data: JSON.stringify(values),
      };

      const response = await CapacitorHttp.post(options);

      console.log(response);

      if (response.status === 200) {
        console.log('Product submission successful');
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
        console.error('Product submission request failed');
      }
    } catch (error) {
      console.error(error, 'Product submission request error');
    }
    onClose()
  };

  return (
    <Modal show={show} onHide={onClose}>
<Modal.Header closeButton>
  <Modal.Title>Add Product</Modal.Title>
</Modal.Header>
<Modal.Body>
    
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {(formikProps: FormikProps<ProductValues>) => (
        <Form onSubmit={formikProps.handleSubmit}>
          <Form.Group controlId="imageUrl">
            <Form.Label className="fw-bold">Image URL</Form.Label>
            <Field type="text" name="imageUrl" as={Form.Control} placeholder="Enter Image URL" />
            <ErrorMessage name="imageUrl" component="div" className="text-danger" />
          </Form.Group>

          <Form.Group controlId="productName">
            <Form.Label className="fw-bold">Product Name</Form.Label>
            <Field type="text" name="productName" as={Form.Control} placeholder="Enter Product Name" />
            <ErrorMessage name="productName" component="div" className="text-danger" />
          </Form.Group>

          <Form.Group controlId="productCategory">
            <Form.Label className="fw-bold">Product Category</Form.Label>
            <Field type="text" name="productCategory" as={Form.Control} placeholder="Enter Product Category" />
            <ErrorMessage name="productCategory" component="div" className="text-danger" />
          </Form.Group>

          <Form.Group controlId="productStock">
            <Form.Label className="fw-bold">Product Stock</Form.Label>
            <Field type="number" name="productStock" as={Form.Control} placeholder="Enter Product Stock" />
            <ErrorMessage name="productStock" component="div" className="text-danger" />
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label className="fw-bold">Product Price</Form.Label>
            <Field type="number" name="productPrice" step="1.00" as={Form.Control} placeholder="Enter Product Price" />
            <ErrorMessage name="productPrice" component="div" className="text-danger" />
          </Form.Group>

       
        </Form>
      )}
    </Formik>
    <form encType='multipart/form-data' className='pt-3'>
              <input
                type="file"
                name='file'
                ref={fileInputRef}
                accept="image/*, video/*"
                onChange={handleFileInputChange}
                multiple={false}
              />
            </form>
            <ul>
      {selectedFiles.map((file, index) => (
        <li key={index}>{file.name} 
        <button onClick={() => removeFile(index)} className='px-3 pt-2 col'>
     <img src="https://i.ibb.co/k1BVnnB/cross.png" className='img-thumbnail' alt="Remove" />
        </button>
         </li>
        
      ))}

    </ul>
    <Modal.Footer>
    <Button variant="primary" type="submit" className="mt-3">
            upload Product
          </Button>
        </Modal.Footer>
     

 
  
</Modal.Body>
</Modal>
  );
};



      


export default AdminForm1;
