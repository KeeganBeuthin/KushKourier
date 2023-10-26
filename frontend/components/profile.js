//@flow

import React from "react";
import { Container, Row } from "react-bootstrap";
import Form1 from "./form/form1";
import Form2 from "./form/form2";
import Form3 from "./form/form3";
import Form4 from "./form/form4";

const ProfilePage = (): React$Element<any> => {
  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <h1>Edit Profile</h1>
        <Form1 />
        <Form2 />
        <Form3 />
        <Form4 />
      </Row>
    </Container>
  );
};

export default ProfilePage;
