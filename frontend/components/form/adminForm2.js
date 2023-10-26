//@flow
import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { CapacitorHttp } from "@capacitor/core";
import type { FormikProps } from "formik";
import userVal from "../../lib/formVal/userVal";

const validate = userVal;
type AdminForm2 = {
  show: boolean,
  onClose: () => void,
};

const initialValues: userId = {
 userId: 0
};

type userId {
  userId: number;

}

const AdminForm2 = ({ show, onClose }: AdminForm2): React$Element<any> => {


  const handleSubmit = async (values: ProductValues) => {
    const apiUrl = "/api/user/delete";

    try {
      const options = {
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          authorization: "include",
        },
        data: values,
      };

      const response = await CapacitorHttp.post(options);

      if (response.status === 200) {
        console.log("User Deletion successful");
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
        console.error("Deletion request failed");
      }
    } catch (error) {
      console.error(error, "Deletion request error");
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {(formikProps: FormikProps<ProductValues>) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <Form.Group controlId="productStock">
                <Form.Label className="fw-bold pt-4">User Id</Form.Label>
                <Field
                  type="number"
                  name="productStock"
                  as={Form.Control}
                  placeholder="Enter Product Stock"
                />
                <ErrorMessage
                  name="productStock"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="primary" type="submit" className="mt-3">
                  upload Product
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>

        <form encType="multipart/form-data" className="pt-3">
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            accept="image/*, video/*"
            onChange={handleFileInputChange}
            multiple={false}
          />
        </form>
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <button onClick={removeFile} className="btn btn-danger">
              Remove File
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdminForm1;
