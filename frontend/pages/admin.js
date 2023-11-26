// @flow
import React from "react";
//  import {Container} from 'react-bootstrap';
// import ControlledCarousel from '../components/carousel';
import Navbar from "../components/navbar";
// import Slider from '../components/slider';
// import Card from '../components/card';
// import ProductRow from '../components/productRow';
// import ProductPage from '../components/productPage'
import AdminPage from "../components/adminPage";
// import { CapacitorHttp } from '@capacitor/core';

type UserProps = {};
const Admin = (/*props: UserProps*/): React$Element<any> => {
  return (
    <>
      <script src="/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <Navbar />
      <AdminPage />
    </>
  );
};
export type { UserProps };
export default Admin;
