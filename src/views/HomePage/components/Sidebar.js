import React, { Component } from "react";
import MetisMenu from "react-metismenu";
import { routes } from "../../../utils/modules/routes";
import "../styles/sidebar.scss";

const content_customer = [
  {
    icon: "icon-class-name",
    label: "Dashboard",
    to: routes.home.path,
  },
  {
    icon: "icon-class-name",
    label: "Transactions",
    content: [
      {
        icon: "icon-class-name",
        label: "View Top 10 Transactions",
        to: "/home/transactions/latest",
      },
    ],
  },
  {
    icon: "icon-class-name",
    label: "Credit Cards",
    content: [
      {
        icon: "icon-class-name",
        label: "View All Credit Cards",
        to: "/home/creditcards/all",
      },
      {
        icon: "icon-class-name",
        label: "Add A Credit Card",
        to: "/home/creditcards/add",
      },
    ],
  },
];

const content_admin = [
  {
    icon: "icon-class-name",
    label: "Dashboard",
    to: routes.adminHome.path,
  },
  {
    icon: "icon-class-name",
    label: "Admin Registration",
    to: routes.adminReg.path,
  },
  {
    icon: "icon-class-name",
    label: "View Failed Transaction",
    to: "",
  },
  {
    icon: "icon-class-name",
    label: "Customer Transactions",
    content: [
      {
        icon: "icon-class-name",
        label: "Fetch customer details",
        to: "",
      },
      {
        icon: "icon-class-name",
        label: "Create a customer with appropriate details",
        to: "",
      },
      {
        icon: "icon-class-name",
        label: "Update customer details",
        to: "",
      },
      {
        icon: "icon-class-name",
        label: "Remove customer (soft removal)",
        to: "",
      },
    ],
  },
];

class Sidebar extends Component {
  render() {
    const { admin } = this.props
    if (admin) {
      return (
        <div className="float-left">
          <MetisMenu content={content_admin} activeLinkFromLocation />
        </div>
      );
    } else {
      return (
        <div className="float-left">
          <MetisMenu content={content_customer} activeLinkFromLocation />
        </div>
      );
    }
  }
}

export default Sidebar;
