import AdminHome from "../../views/HomePage/AdminPages/AdminHome";
import AdminReg from "../../views/HomePage/AdminPages/AdminReg";
import UserHome from "../../views/HomePage/index";
import LandingPage from "../../views/LandingPage";
import ListCreditCards from "../../views/CreditCardView"
import ListCreditCardAsButton from "../../views/TransactionView"
import { adminHome, adminRegistration, customerHome, landingPagePath, viewAllCreditCards, viewTransactions } from "../../constants/paths";

export const routes = {
  landingPage: {
    path: landingPagePath,
    component: LandingPage,
  },

  adminHome: {
    path: adminHome,
    component: AdminHome
  },
  home: {
    path: customerHome,
    component: UserHome
  },

  adminReg: {
    path: adminRegistration,
    component: AdminReg
  },

  viewAllCreditCards: {
    path: viewAllCreditCards,
    component: ListCreditCards
  },

  viewTransactions: {
    path: viewTransactions,
    component: ListCreditCardAsButton
  }
};
