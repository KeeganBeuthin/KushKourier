//@flow
import React,{ useState } from 'react';
import {Container,Row} from 'react-bootstrap';
import AdminForm1 from '../components/form/AdminForm1'

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
        <button className="btn btn-outline-light text-dark" onClick={() => openAdminModal1()}>
            add product
              </button>
        <AdminForm1 show={showAdminModal1} onClose={closeAdminModal1}/>
    </Row>
    </Container>
  );
};










export default AdminPage;
