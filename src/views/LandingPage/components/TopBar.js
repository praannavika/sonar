import React, { Fragment } from "react";
import { connect } from "react-redux";
import { goToLogin, goToRegistration } from "../../../actions/customerAuth";
import { AUTH_TOKEN } from "../../../constants/params";
import { logout } from "../../../utils/helpers/shared";

const activePage = ['none', 'register', 'login']

const TopBar = (props) => {
  return (
    <div className="container-fluid landing-top-bar">
      <div className="d-flex flex-row justify-content-end align-items-center">

        <div className="text-left pt-4 pb-4">
          <div className="d-flex flex-row justify-content-around">
            {localStorage.getItem(AUTH_TOKEN) ?
              <div className="col-xs-4 mr-5">
                <div className="alert-light div-link" onClick={() => { logout() }}>Logout</div>
                {/* <div onClick={()=>{login()}}>Login</div> */}
              </div>
              :
              (
                <Fragment>
                  <div className="col-xs-4 mr-5">
                    <div id="register-link" className={`alert-light div-link ${activePage[props.activeLink] === 'register' ? `active` : ''}`} onClick={() => { props.openRegistration() }}>Register</div>
                    {/* <div onClick={()=>{props.register()}}>Register</div> */}
                  </div>
                  <div className="col-xs-4 mr-5">
                    <div id="login-link" className={`alert-light div-link ${activePage[props.activeLink] === 'login' ? `active` : ''}`} onClick={() => { props.openLogin() }}>Login</div>
                    {/* <div onClick={()=>{login()}}>Login</div> */}
                  </div>
                </Fragment>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeLink: state.authReducer.activeLink
  }
}

const mapDispatchToProps = {
  openRegistration: goToRegistration,
  openLogin: goToLogin,
}




export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
