import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import store from "../../redux/store";
import Home from "../../pages/home";
import User from "../../pages/user";
import Shop from "../../pages/shop";
import Admin from '../../pages/admin'
setupIonicReact({});

const AppShell = () => {
  return (
    <>
              <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Switch>
            <Route path="/shop" component={Shop} /> 
              <Route path="/shop/:page" component={Shop} />
              <Route path="/" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>

      </IonApp>
    </Provider>
    </>
  );
};
export default AppShell;
