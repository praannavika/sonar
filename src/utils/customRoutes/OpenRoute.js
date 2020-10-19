import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

class OpenRoute extends Component {
  render() {
    const { component, path } = this.props;
    return <Route component={component} path={path} />;
  }
}

export default withRouter(OpenRoute);
