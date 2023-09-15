import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import App from 'next/app';

import { Provider } from '@capacitor/core';

import 'bootstrap/dist/css/bootstrap.min.css';







export default function MyApp({ Component, pageProps }) {


  return (
   <>
 
      <Head>
      </Head>
  
      <Component {...pageProps}/>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
      ></Script>
      <Script
        nomodule=""
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"
      ></Script>

 </>
  );
}