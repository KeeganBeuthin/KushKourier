// @flow

import React, { useState,useEffect } from 'react';
import LoginRegisterModal from './login'; // Make sure to import the LoginModal component
import { CapacitorHttp } from '@capacitor/core';
import LoginModal from './LoginModal'
import RegisterModal from './registerModal'
type NavbarProps = {
};

const Navbar = (props: NavbarProps): React$Element<any> => {
  const [auth, setAuth] = useState(false);
  const [activeModal, setActiveModal] = useState('login');
  useEffect(() => {
    // Function to send a request to the '/api/cookieVal' endpoint
    const fetchData = async () => {
      const apiUrl = '/api/cookieVal';
      try {
        const options = {
          url: apiUrl,
          headers: { 'Content-Type': 'application/json', 'credentials': 'include' },
        };
        const response = await CapacitorHttp.post(options);
        if (response.status === 200) {
          setAuth(true);
        }
      } catch {
        console.log('An error occurred');
      }
    };

    fetchData(); 
  }, []);

  const [showModal, setShowModal] = useState(false);

  const openModal = (modalType: string) => {
    setShowModal(true);
    setActiveModal(modalType);
  }; 

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light Fgreen shadow-lg">
      <img src="/kushman.png" alt="weed leaf" className="col-md-1 mx-1 d-block mw-100 mh-300 logo-image" />
      <a className="navbar-brand Lgreen d-inline-flex fs-1 pacifico" href="/home">Kush Kourier</a>

      <button className="navbar-toggler ps-sm-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>


      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-3">
          <li className="nav-item">
          <button className="btn btn-outline-light text-dark" onClick={() => openModal('login')}>
            <img src={'/person.svg'} width='20' height={20} alt="Search Icon" />
            {activeModal === 'login' ? 'Login' : 'login'}
          </button>
        </li>
        {activeModal === 'login' ? (
          <LoginModal show={showModal} onClose={closeModal} switchForm={() => openModal('register')} />
        ) : (
          <RegisterModal show={showModal} onClose={closeModal} switchForm={() => openModal('login')} />
        )}
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>

        <form className="d-flex ml-auto my-2 my-lg-0">
          <div className="input-group">
            <input className="form-control rounded overflow-hidden" type="text" placeholder="Search" style={{ width: 350 }} />
            <div className="input-group-append">
              <button className="btn btn-outline-light my-2 my-sm-0 text-light me-sm-2 ms-sm-1" type="submit">
                <img src={'/search.svg'} width='20' height={20} alt="Search Icon" />
              </button>
            </div>
          </div>
        </form>

      </div>
    </nav>
  );
}

export default Navbar;
