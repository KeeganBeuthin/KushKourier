// @flow

import React, { useState, useEffect } from "react";
import { CapacitorHttp } from "@capacitor/core";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setEmail } from "../redux/userSlice";
import RegisterModal from "./registerModal";
import { Capacitor } from "@capacitor/core";
import { useRouter } from "next/router";
// type NavbarProps = {
// };

function generateRandomHash(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const isAndroid = Capacitor.getPlatform() === "android";

let client;

let logout;

let cartVal

let cartCreate

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

if (isAndroid) {
  cartVal = "http://192.168.39.115:9000/api/cart/val";
} else {
  cartVal = "/api/cart/val";
}

if (isAndroid) {
  cartCreate = "http://192.168.39.115:9000/api/cart/create";
} else {
  cartCreate = "/api/cart/create";
}



const Navbar = (/*props: NavbarProps*/): React$Element<any> => {

  const router = useRouter();

  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState("login");

  const username = useSelector((state) => state.user.username);

  const [showCartNav, setShowCartNav] = useState(false);

  const openCartNav = () => {
    setShowCartNav(true);
  };

  const closeCartNav = () => {
    setShowCartNav(false);
  };


  const navigateToCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    const cartCheck = async () => {

      try {
        const options = {
          url: cartVal,
          headers: {
            "Content-Type": "application/json",
            'credentials': "include",
          },
        };
        const response = await CapacitorHttp.post(options);
        if (response.status == 200) {
          next()
        }
        else if(response.status == 404){
          console.log('jj')
          const newCartHash = generateRandomHash(40);
          console.log(newCartHash)
   
          document.cookie =`cartHash=${newCartHash}; path=/; max-age=360000000; samesite=lax`;

          const options = {
            url: cartCreate,
            headers: {
              "Content-Type": "application/json",
              'credentials': "include",
            },
          };
          const response = await CapacitorHttp.post(options);


        }
      } catch {
        console.log("An error occurred");
      }
    };

    cartCheck();
  }, []);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const options = {
          url: client,
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
        href={isAndroid ? "/" : "/home"}
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
            <a className="nav-link Lgreen" href="/shop/1">
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
            <button
            className="btn btn-outline-light my-2 my-sm-0 text-light me-sm-2 ms-sm-1"
            onClick={navigateToCart} >
            <img
              src={"/cart.svg"}
              width="20"
              height="20"
              alt="Cart Icon"
            />
          </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
