import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import store from "../../redux/store";
import Home from "../../pages/home";
import User from "../../pages/user";
import Shop from "../../pages/shop";
setupIonicReact({});

const AppShell = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Switch>
            <Route path="/shop" component={Shop} /> 
              <Route path="/shop/:page" component={Shop} />
              <Route path="/" exact component={Home} />
              <Route path="/user" component={User} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};
export default AppShell;
