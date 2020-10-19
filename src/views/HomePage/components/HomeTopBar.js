import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FIRST_NAME, LAST_NAME } from '../../../constants/params';
import { logout } from '../../../utils/helpers/shared';
import { routes } from '../../../utils/modules/routes';
import '../styles/homeTopBar.scss'

class HomeTopBar extends Component {

  toggleSideBar = () => {

  }

  render() {
    const firstName = localStorage.getItem(FIRST_NAME);
    const lastName = localStorage.getItem(LAST_NAME);
    return (
      <div className="home-top-bar d-flex justify-content-between">
        <div onClick={this.toggleSideBar}>

        </div>
        <div className="dropdown">
          <h6 href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Welcome {lastName}, {firstName}<span class="caret"></span></h6>
          <ul className="dropdown-menu custom-menu">
            <li>
              <Link to="#">Settings</Link>
            </li>
            <li>
              <Link to={routes.home.path} onClick={logout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HomeTopBar;
