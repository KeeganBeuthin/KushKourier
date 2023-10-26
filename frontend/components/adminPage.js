//@flow
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import AdminForm1 from "../components/form/AdminForm1";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";

const isAndroid = Capacitor.getPlatform() === "android";

let client;

if (isAndroid) {
  client = "http://192.168.39.115:9000/api/admin/val";
} else {
  client = "/api/admin/val";
}


const AdminPage = (): React$Element<any> => {


  const [showAdminModal1, setShowAdminModal1] = useState(false);

  const openAdminModal1 = () => {
    setShowAdminModal1(true);
  };

  const closeAdminModal1 = () => {
    setShowAdminModal1(false);
  };

  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <h1>Admin Terminal</h1>
        <button
          className="btn btn-primary text-light"
          onClick={() => openAdminModal1()}
        >
          add product
        </button>
        <AdminForm1 show={showAdminModal1} onClose={closeAdminModal1} />
      </Row>
    </Container>
  );
};

export default AdminPage;
