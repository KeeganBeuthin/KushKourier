//@flow
import React, { useState,useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import AdminForm1 from "../components/form/AdminForm1";
import { Capacitor } from "@capacitor/core";
import { CapacitorHttp } from "@capacitor/core";
import MasterForm1 from '../components/form/masterForm1'
const isAndroid = Capacitor.getPlatform() === "android";

let client;
if (isAndroid) {
  client = "http://192.168.39.115:9000/api/admin/val";
} else {
  client = "/api/admin/val";
}


const AdminPage = (): React$Element<any> => {


  const [showAdminModal1, setShowAdminModal1] = useState(false);

  const [showMasterModal1, setShowMasterModal1] = useState(false);

  const [master, setMaster] = useState(false);

  const openAdminModal1 = () => {
    setShowAdminModal1(true);
  };

  const closeAdminModal1 = () => {
    setShowAdminModal1(false);
  };

  const openMasterModal1 = () => {
    setShowMasterModal1(true);
  };

  const closeMasterModal1 = () => {
    setShowMasterModal1(false);
  };


  useEffect(() => {
    async function checkMaster() {
      const apiUrl = client;
      try {
        const options = {
          url: apiUrl,
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        };
        const response = await CapacitorHttp.post(options);
        if (response.status===201) {
          setMaster(true);
          console.log(master)
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    }

    checkMaster();
  }, []);

  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <h1>Admin Terminal</h1>
        {master ? (
          // Render different UI when master is true
          <>
            <button
              className="btn btn-primary text-light mb-4"
              onClick={() => openAdminModal1()}
            >
              Add Product
            </button>
            <AdminForm1 show={showAdminModal1} onClose={closeAdminModal1} />
            <button
              className="btn btn-primary text-light mt-4"
              onClick={() => openMasterModal1()}
            >
              Promote User
            </button>
            <MasterForm1 show={showMasterModal1} onClose={closeMasterModal1} />
          </>
        ) : (
          <>
          <button
            className="btn btn-primary text-light"
            onClick={() => openAdminModal1()}
          >
            Add Product
          </button>
          <AdminForm1 show={showAdminModal1} onClose={closeAdminModal1} />
        </>
        )}
      </Row>
    </Container>
  );
};

export default AdminPage;
