// @flow

import React, { useState, useEffect } from "react";
import { CapacitorHttp } from "@capacitor/core";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setEmail } from "../redux/userSlice";
import RegisterModal from "./registerModal";
import { Capacitor } from "@capacitor/core";
// type NavbarProps = {
// };

const isAndroid = Capacitor.getPlatform() === "android";

let client;

let logout;


if (isAndroid) {
  client = "http://192.168.39.115:9000/api/cookieVal";
} else {
  client = "/api/cookieVal";
}

if (isAndroid) {
  logout = "http://192.168.39.115:9000/api/logout";
} else {
  logout = "/api/logout";
}




const Navbar = (/*props: NavbarProps*/): React$Element<any> => {
  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState("login");

  const username = useSelector((state) => state.user.username);

  // const email = useSelector((state) => state.user.email);

  const name = useSelector((state) => state.user.legalName);

  console.log(name);

  useEffect(() => {
    const fetchData = async () => {
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
        if (response.status === 200) {
          dispatch(setUsername(response.data.package.username));
          dispatch(setEmail(response.data.package.email));
          dispatch(setEmail(response.data.package.legalName));
          setAuth(true);
        }
      } catch {
        console.log("An error occurred");
      }
    };

    fetchData();
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

  const openModal = (modalType: string) => {
    setShowModal(true);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
      try {
        const options = {
          url: logout,
          headers: {
            "Content-Type": "application/json",
            'credentials': "include",
          },
        };
        const response = await CapacitorHttp.post(options);
        if (response.status === 200) {
          setAuth(false);

        }
      } catch {
        console.log("An error occurred");
      }
    }

  

  return (
    <nav className="navbar navbar-expand-lg navbar-light Fgreen shadow-lg">
      <img
        src="/kushman.png"
        alt="weed leaf"
        className="col-md-1 mx-1 d-block mw-100 mh-300 logo-image"
      />
      <a
        className="navbar-brand Lgreen d-inline-flex fs-1 pacifico"
        href="/home"
      >
        Kush Kourier
      </a>
      <button
        className="navbar-toggler ps-sm-2"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-3">
          <li className="nav-item">
            {auth ? (
               <>
              <li className="nav-item d-inline-flex">
                <a className="nav-link Lgreen" href="/user">
                  hello {username}!
                </a>
              </li>
              <li className="nav-item d-inline-flex">
                <button
                  className="btn btn-outline-light text-dark"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          
            ) : (
              <button
                className="btn btn-outline-light text-dark"
                onClick={() => openModal("login")}
              >
                <img
                  src={"/person.svg"}
                  width="20"
                  height={20}
                  alt="Search Icon"
                />
                {activeModal === "login" ? "Login/Register" : "login/Register"}
              </button>
            )}
          </li>
          {auth ? null : (
            <li className="nav-item">
              {activeModal === "login" ? (
                <LoginModal
                  show={showModal}
                  onClose={closeModal}
                  switchForm={() => openModal("register")}
                />
              ) : (
                <RegisterModal
                  show={showModal}
                  onClose={closeModal}
                  switchForm={() => openModal("login")}
                />
              )}
            </li>
          )}
          <li className="nav-item">
            <a className="nav-link Lgreen" href="/shop">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link Lgreen" href="#">
              services
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link Lgreen" href="#">
              Contact
            </a>
          </li>
        </ul>

        <form className="d-flex ml-auto my-2 my-lg-0">
          <div className="input-group">
            <input
              className="form-control rounded overflow-hidden"
              type="text"
              placeholder="Search"
              style={{ width: 350 }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-light my-2 my-sm-0 text-light me-sm-2 ms-sm-1"
                type="submit"
              >
                <img
                  src={"/search.svg"}
                  width="20"
                  height={20}
                  alt="Search Icon"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
