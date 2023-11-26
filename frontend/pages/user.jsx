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

import ProfilePage from "../components/profile";
import { useRouter } from "next/router";
// import { CapacitorHttp } from '@capacitor/core';

type UserProps = {};
const User = (/*props: UserProps*/): React$Element<any> => {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cookieVal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 500) {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [router]);

  return (
    <>
     <script src="/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <Navbar />
      <ProfilePage />
    </>
  );
};
export type { UserProps };
export default User;
