import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm"
import TopBar from "./components/TopBar";
import './style/index.scss'

const PAGES = ['home', 'registration', 'login']

class LandingPage extends Component{
  render(){
    const { currPage } = this.props;

    let mainContent;
    
    switch(PAGES[currPage]){
      case 'home':
        mainContent = (
          <div className="text-center landing-main-content d-flex flex-column justify-content-center">
            <h1>Welcome to Credi Buddy</h1>
          </div>
        )
        break;

      case 'registration':
        mainContent = (
          <div className="text-center landing-main-content d-flex flex-column justify-content-center">
            <RegistrationForm/>
          </div>
        )
        break;

      case 'login' :
        mainContent = (
          <div className="text-center landing-main-content d-flex flex-column justify-content-center">
            <LoginForm></LoginForm>
          </div>
        )
        break;

        default:
          mainContent = (
            <div>
              No content found
            </div>
          )
          break;

    }

    return (
      <div className = "parent-container">
        <TopBar></TopBar>
        {mainContent}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    message : state.authReducer.message,
    currPage : state.authReducer.currPage
  }
}

export default connect(mapStateToProps)(LandingPage);
