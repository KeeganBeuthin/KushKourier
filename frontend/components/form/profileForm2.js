//@flow
import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import type { FormikProps } from "formik";
import { validateEmail } from "../../lib/formval/emailValidate";
import { Form, Button } from "react-bootstrap";
import { CapacitorHttp } from "@capacitor/core";

const validate = validateEmail;

type ProfileValues = {
  profileEmail: string | void,
};

const initialValues: ProfileValues = {
  profileEmail: "",
};

const Form2 = (): React$Element<any> => {
  const handleSubmit = async (values: ProfileValues) => {
    const apiUrl = "/api/users/email";

    try {
      const options = {
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          authorization: "include",
        },
        data: JSON.stringify(values),
      };

      const response = await CapacitorHttp.post(options);

      if (response.status === 200) {
        console.log("Registration successful");
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
        console.error("Registration request failed");
      }
    } catch (error) {
      console.error(error, "Registration request error");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formikProps: FormikProps<ProfileValues>) => (
        <Form onSubmit={formikProps.handleSubmit}>
          <>
            <Form.Group controlId="profileEmail" className="mt-3">
              <Form.Label className="fw-bold">Change Email</Form.Label>
              <Field
                type="text"
                name="profileEmail"
                as={Form.Control}
                placeholder="somebody@example.com"
              />
              <ErrorMessage
                name="profileEmail"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              save new email
            </Button>
          </>
        </Form>
      )}
    </Formik>
  );
};
export default Form2;
