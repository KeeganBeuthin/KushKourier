// @flow
import React from "react";
import Navbar from "../components/navbar";
import Slider from "../components/slider";
// import Card from '../components/card';
import ProductRow from "../components/productRow";

type HomeProps = {};
const Home = (/*props: HomeProps*/): React$Element<any> => {
  return (
    <>
    <script src="/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <Navbar />
      <ProductRow />
      <Slider />
    </>
  );
};
export type { HomeProps };
export default Home;
