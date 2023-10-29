// @flow
import React from "react";
import { useEffect } from "react";
//  import {Container} from 'react-bootstrap';
// import ControlledCarousel from '../components/carousel';
import Navbar from "../components/navbar";
// import Slider from '../components/slider';
// import Card from '../components/card';
// import ProductRow from '../components/productRow';
// import ProductPage from '../components/productPage'

import AdminPage from "../components/adminPage";
import { useRouter } from "next/router";
// import { CapacitorHttp } from '@capacitor/core';

type UserProps = {};
const Admin = (/*props: UserProps*/): React$Element<any> => {

  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/val", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !==200||201) {
        
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [router]);



  return (
    <>
      <Navbar />
      <AdminPage />
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};
export type { UserProps };
export default Admin;