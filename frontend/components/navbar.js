import React, { useState } from 'react';
import LoginRegisterModal from './login'; // Make sure to import the LoginModal component

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light Fgreen shadow-lg">
      <img src="/kushman.png" alt="weed leaf" className="col-md-1 mx-1 d-block mw-100 mh-300 logo-image"/>
      <a className="navbar-brand Lgreen d-inline-flex fs-1 pacifico" href="/home">Kush Kourier</a>

      <button className="navbar-toggler ps-sm-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible search bar */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-3">
        <li className="nav-item">
          <button className="btn btn-outline-light text-dark" onClick={openModal}><img src={'/person.svg'} width='20' height={20} alt="Search Icon"/>Login</button>
        </li>
        <LoginRegisterModal show={showModal} onClose={closeModal}/>
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
