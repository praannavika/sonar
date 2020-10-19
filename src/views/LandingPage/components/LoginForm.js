import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoading } from "../../../actions/loadingAction";
import { login, baseUrl } from "../../../constants/endpoints";
import { ADMIN, CUSTOMER } from "../../../constants/params";
import { emailRegex, loginPasswordRegex } from "../../../constants/regex";
import { setStorageOnLoginAdmin, setStorageOnLoginUser } from "../../../utils/helpers/shared";
import { routes } from "../../../utils/modules/routes";
import { fetchApi } from "../../../utils/services/fetchApi";

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            isEmailValid: true,
            isPasswordEntered: true,
            isAdmin: false,
            error: "",
        };
        this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        let { email, password, isAdmin } = this.state;
        let roles;
        if (isAdmin === true) {
            roles = ["admin"]
        } else {
            roles = ["customer"]
        }


        let data = {
            email,
            password,
            roles,
        };
        this.loginUser(data, isAdmin);


    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    changeSetAdmin = (e) => {
        this.setState({
            isAdmin: !this.state.isAdmin,
        });
    };

    validateEmail = (e) => {
        const { isPasswordEntered } = this.state;
        let isEmailValid = emailRegex.test(e.target.value);
        let elem = document.getElementById(e.target.id);
        if (isEmailValid && e.target.value.length !== 0) {
            elem.style.borderColor = '#28A745';
            elem.style.boxShadow = "0 0 1px 1px #28A745"
        } else {
            elem.style.borderColor = 'rgba(220,53,69,0.37)'
            elem.style.boxShadow = "0 0 1px 1px rgba(220,53,69,0.37)"
        }
        this.setState({
            isEmailValid,
            isButtonDisabled: isEmailValid && isPasswordEntered ? false : true
        })
    }

    validatePassword = (e) => {
        const { isEmailValid } = this.state;
        this.setState({
            isPasswordEntered: e.target.value.length > 0 ? true : false,
            isButtonDisabled: isEmailValid && e.target.value.length > 0 ? false : true
        })
    }

    clearError = (e) => {
        let field = e.target.id;
        let elem = document.getElementById(field);
        switch (field) {
            case 'email':
                this.setState({
                    isEmailValid: true
                })
                elem.style.borderColor = '#ced4da';
                elem.style.boxShadow = "0 0 1px 1px #ced4da";
                break;

            case 'password':
                this.setState({
                    isPasswordEntered: true
                })
                elem.style.borderColor = '#ced4da';
                elem.style.boxShadow = "0 0 1px 1px #ced4da";
                break;

            default:
                break;
        }
    }

    loginUser = (data, isAdminChecked) => {
        this.props.setLoading(true);
        fetchApi(`${baseUrl}${login}`, "POST", data)((err, res) => {
            if (err === null) {
                switch (res.status) {
                    case 200:
                        if (isAdminChecked) {
                            if (res.data.roles.includes(ADMIN)) {
                                setStorageOnLoginAdmin(res.data);
                                window.location = routes.adminHome.path;
                            } else {
                                setStorageOnLoginUser(res.data);
                                this.props.setLoading(false);
                                this.setState({
                                    error: 'You do not have the admin privileges'
                                })
                            }
                        } else {
                            if (res.data.roles.includes(CUSTOMER)) {
                                setStorageOnLoginUser(res.data);
                                window.location = routes.home.path;
                            } else {
                                setStorageOnLoginAdmin(res.data);
                                this.props.setLoading(false);
                                this.setState({
                                    error: 'You do not have the customer privileges'
                                })
                            }
                        }
                        break;

                    default:
                        this.props.setLoading(false);
                        alert("Something went wrong");
                        break;
                }
            } else {
                switch (err.status) {
                    case 401:
                        this.props.setLoading(false);
                        this.setState({
                            error: err.data.message
                        })
                        break;

                    default:
                        this.props.setLoading(false);
                        alert("Something went wrong");
                        break;
                }
            }
        })
    }

    render() {
        const { isEmailValid, isPasswordEntered, error, email, password, isButtonDisabled } = this.state
        return (
            <div className="login-form">
                <div className="form-header text-left">
                    Login Form
                </div>
                {error ?
                    <div className="text-center text-danger pt-5">
                        {error}
                    </div>
                    :
                    null
                }
                <form className="p-5" onSubmit={(e) => { this.submitForm(e) }}>
                    <div className="form-group d-flex flex-wrap">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" name="email" autoFocus value={email} placeholder="Email" onBlur={this.validateEmail} onKeyDown={this.clearError} onChange={this.handleChange} />
                            {email.length === 0 ? null : (isEmailValid ? null : <div className="text-danger text-left">Please enter a valid email</div>)}
                        </div>
                    </div>

                    <div className="form-group d-flex flex-wrap">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name="password" id="password" value={password} placeholder="Password" onBlur={this.validatePassword} onKeyDown={this.clearError} onChange={this.handleChange} />
                            {isPasswordEntered ? null : <div className="text-danger text-left">Please enter a password</div>}
                        </div>
                    </div>

                    <div className="form-check p-4">
                        <input type="checkbox" className="form-check-input" id="role-admin" onChange={this.changeSetAdmin}
                            onchecked={this.state.isAdmin} />
                        <label className="form-check-label" htmlFor="role-admin">Login as admin</label>
                    </div>

                    <button type="submit" id="submit-btn" className={`btn ${isButtonDisabled ? 'btn-secondary' : 'btn-primary'}`} disabled={isButtonDisabled}>Submit</button>

                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setLoading: setLoading
}

export default connect(null, mapDispatchToProps)(LoginForm);
