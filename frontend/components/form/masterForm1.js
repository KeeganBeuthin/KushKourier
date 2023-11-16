//@flow
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { CapacitorHttp } from "@capacitor/core";
import type { FormikProps } from "formik";
import userVal from "../../lib/adminVal/userVal";

const validate = userVal;
type MasterForm1 = {
  show: boolean,
  onClose: () => void,
};

type UserId = {
  userId: number | void,
};

const initialValues: UserId = {
  userId: 0,
};

const PromoteForm = ({ show, onClose }: MasterForm1): React$Element<any> => {
  console.log(initialValues.userId);
  const handleSubmit = async (values: UserId) => {
    const apiUrl = "/api/user/promote";

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
        console.log("User Promotion successful");
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
        console.error("Deletion Promotion failed");
      }
    } catch (error) {
      console.error(error, "Promotion request error");
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Promote to admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {(formikProps: FormikProps<UserId>) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <Form.Group controlId="userId">
                <Form.Label className="fw-bold pt-4">User Id</Form.Label>
                <Field
                  type="number"
                  name="userId"
                  as={Form.Control}
                  placeholder="Enter User Id"
                />
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="primary" type="submit" className="mt-3">
                  Promote User
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PromoteForm;
