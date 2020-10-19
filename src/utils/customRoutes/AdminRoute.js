import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { ADMIN, AUTH_TOKEN, ROLE } from "../../constants/params";
import { isAdmin } from "../helpers/shared";
import { routes } from "../modules/routes";

class AdminRoute extends Component {
  render() {
    const { component, path } = this.props;
    if (localStorage.getItem(AUTH_TOKEN) && isAdmin()) {
      return <Route exact component={component} path={path} />;
    } else {
      return window.location.href = routes.landingPage.path
    }

  }
}

export default withRouter(AdminRoute);
