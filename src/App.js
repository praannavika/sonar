import React from "react";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { routes } from "./utils/modules/routes";
import { Provider } from "react-redux";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js'
import Sidebar from "./views/HomePage/components/Sidebar";
import HomeTopBar from "./views/HomePage/components/HomeTopBar";
import AdminRoute from "./utils/customRoutes/AdminRoute"
import OpenRoute from "./utils/customRoutes/OpenRoute"
import UserRoute from "./utils/customRoutes/UserRoute"
import { hasAdminPath } from "./utils/helpers/shared";
import LoadingWrapper from "./views/LoadingWrapper";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {window.location.pathname === routes.landingPage.path ? null : (
          <>
            <Sidebar admin={hasAdminPath() ? true : false}></Sidebar>
            <div className='sidebar-offset' >
              <div className="d-flex flex-column flex-grow-1">
                <HomeTopBar></HomeTopBar>
              </div>
            </div>
          </>
        )}
        <Switch>
          <OpenRoute
            exact
            path={routes.landingPage.path}
            component={routes.landingPage.component}
          />
          <AdminRoute
            exact
            path={routes.adminHome.path}
            component={routes.adminHome.component}
          >
          </AdminRoute>
          <UserRoute
            exact
            path={routes.home.path}
            component={routes.home.component}
          />
          <UserRoute
            exact
            component={routes.viewAllCreditCards.component}
            path={routes.viewAllCreditCards.path}
          />
          <UserRoute
            exact
            component={routes.viewTransactions.component}
            path={routes.viewTransactions.path}
          />
          <AdminRoute
            exact
            path={routes.adminReg.path}
            component={routes.adminReg.component}
          />
        </Switch>
      </BrowserRouter>
      <LoadingWrapper></LoadingWrapper>
    </Provider>
  );
}

export default App;
