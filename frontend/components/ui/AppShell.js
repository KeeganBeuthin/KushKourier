import dynamic from 'next/dynamic';
import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import store from "../../redux/store";
import Home from "../../pages/home";
import User from "../../pages/user";
import Shop from "../../pages/shop";
import Admin from '../../pages/admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Cart = dynamic(() => import('../../pages/cart/[cartHash]'));

setupIonicReact({});

const AppShell = () => {
  return (
    <>
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Switch>
            <Route path="/shop" component={Shop} /> 
              <Route path="/shop/:page" component={Shop} />
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/cart/:cartHash" component={Cart} />
              <Route path="/admin" component={Admin} />
              <Redirect from="/" to="/home" exact />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
    </>
  );
};
export default AppShell;
