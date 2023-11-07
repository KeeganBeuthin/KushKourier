//@flow
import React from "react";
// import { AppProps } from 'next/app';
import Head from "next/head";
import Script from "next/script";

import store from "../redux/store";
import "../styles/main.css";
import { Provider } from "react-redux";
type CustomAppProps = {
  Component: any,
  pageProps: any,
};

export default function MyApp({
  Component,
  pageProps,
}: CustomAppProps): React$Element<any> {
  return (
    <>
      <Provider store={store}>
       
        <Head />
        <Component {...pageProps} />
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
        ></Script>
        <Script
          nomodule=""
          src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"
        ></Script>
       
      </Provider>
    </>
  );
}
