// @flow
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import login_validate from "../lib/loginValidate";
import { CapacitorHttp } from "@capacitor/core";
import type { FormikProps } from "formik";
type LoginModalProps = {
  show: boolean,
  onClose: () => void,
  switchForm: () => void,
};

type LoginValues = {
  loginUsername: string | void,
  loginPassword: string | void,
};

const LoginModal = ({
  show,
  onClose,
  switchForm,
}: LoginModalProps): React$Element<any> => {
  const initialValues: LoginValues = {
    loginUsername: "",
    loginPassword: "",
  };

  const handleSubmit = async (values: LoginValues) => {
    const apiUrl: string = "/api/login";

    try {
      const options = {
        url: apiUrl,
        headers: { "Content-Type": "application/json", credentials: "include" },
        data: JSON.stringify(values),
      };

      const response = await CapacitorHttp.post(options);

      if (response.status === 200) {
        console.log("Login successful");
        window.location.reload();
      } else {
        console.log(response);
        console.error("Login request failed");
      }
    } catch (error) {
      console.error("Login request error", error);
    }

    onClose();
  };

  const validate = login_validate;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {(formikProps: FormikProps<LoginValues>) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <Form.Group controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Field
                  type="text"
                  name="loginUsername"
                  as={Form.Control}
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="loginUsername"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Field
                  type="password"
                  name="loginPassword"
                  as={Form.Control}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="loginPassword"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={switchForm}>
                  Need an account?
                </Button>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
