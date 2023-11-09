// @flow
import React from "react";
import Navbar from "../components/navbar";
import CartScreen from '../components/cartScreen'
type UserProps = {};
const Admin = (/*props: UserProps*/): React$Element<any> => {

  return (
    <>
      <Navbar />
      <CartScreen/>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};
export type { UserProps };
export default Admin;
