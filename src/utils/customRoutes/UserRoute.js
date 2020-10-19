import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { AUTH_TOKEN, CUSTOMER, ROLE } from "../../constants/params";
import { isCustomer } from "../helpers/shared";
import { routes } from "../modules/routes";

class UserRoute extends Component {
  render() {
    const { component, path } = this.props;
    if (localStorage.getItem(AUTH_TOKEN) && isCustomer()) {
      return <Route exact component={component} path={path} />;
    } else {
      return window.location.href = routes.landingPage.path
    }

  }
}

export default withRouter(UserRoute);
