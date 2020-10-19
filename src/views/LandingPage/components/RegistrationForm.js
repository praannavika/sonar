import React, { Component } from "react";

import { baseUrl, register, verifyEmail, } from "../../../constants/endpoints";
import { emailRegex, registerPasswordRegex } from "../../../constants/regex";
import { fetchApi } from "../../../utils/services/fetchApi";
import emailjs from 'emailjs-com';
import { userId, verifcationTemplateId, verificationServiceId } from "../../../config/verificationEmailConfig";
import { verificationToken } from "../../../utils/helpers/shared";
import { setLoading } from "../../../actions/loadingAction";
import { connect } from "react-redux";


class RegistrationForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            isEmailValid: true,
            isPasswordValid: true,
            error: "",
            successMesaage: "",
        };
        this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        let { email, password } = this.state;
        let roles = ["customer"];

        let data = {
            email,
            password,
            roles,
        };

        this.registerUser(data);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    validateEmail = (e) => {
        const { isPasswordValid } = this.state;
        let isEmailValid = emailRegex.test(e.target.value);
        let elem = document.getElementById(e.target.id);
        if (isEmailValid && e.target.value.length !== 0) {
            elem.style.borderColor = "#28A745";
            elem.style.boxShadow = "0 0 1px 1px #28A745";
        } else {
            elem.style.borderColor = "rgba(220,53,69,0.37)";
            elem.style.boxShadow = "0 0 1px 1px rgba(220,53,69,0.37)";
        }
        this.setState({
            isEmailValid,
            isButtonDisabled: isEmailValid && isPasswordValid ? false : true,
        });
    };

    validatePassword = (e) => {
        const { isEmailValid } = this.state;
        let isPasswordValid = registerPasswordRegex.test(e.target.value);
        let elem = document.getElementById(e.target.id);
        if (isPasswordValid && e.target.value.length >= 6) {
            elem.style.borderColor = "#28A745";
            elem.style.boxShadow = "0 0 1px 1px #28A745";
        } else {
            elem.style.borderColor = "rgba(220,53,69,0.37)";
            elem.style.boxShadow = "0 0 1px 1px rgba(220,53,69,0.37)";
        }
        this.setState({
            isPasswordValid,
            isButtonDisabled: isEmailValid && isPasswordValid ? false : true,
        });
    };

    clearError = (e) => {
        let field = e.target.id;
        let elem = document.getElementById(field);
        switch (field) {
            case "email":
                this.setState({
                    isEmailValid: true,
                });
                elem.style.borderColor = "#ced4da";
                elem.style.boxShadow = "0 0 1px 1px #ced4da";
                break;

            case "password":
                this.setState({
                    isPasswordValid: true,
                });
                elem.style.borderColor = "#ced4da";
                elem.style.boxShadow = "0 0 1px 1px #ced4da";
                break;
        }
    };

    registerUser = (data) => {
        this.props.setLoading(true);
        const token = verificationToken();
        fetchApi(`${baseUrl}${register}`, "POST", data)((err, res) => {
            if (err === null) {
                switch (res.status) {
                    case 200:
                        const templateParams = {
                            from: 'Credi Buddy',
                            to: data.email,
                            subject: 'Greetings from Credi Buddy!!!',
                            link: `${baseUrl}${verifyEmail}${token}`
                        }
                        emailjs.send(
                            verificationServiceId,
                            verifcationTemplateId,
                            templateParams,
                            userId
                        ).then(() => {
                            this.props.setLoading(false);
                            this.setState({
                                successMesaage: `${res.data.message} Kindly verify your email id and login`,
                                email: '',
                                password: '',
                                isButtonDisabled: true,
                                error: ''
                            });

                        }).catch(() => {
                            this.props.setLoading(false);
                            this.setState({
                                successMesaage: 'Something went wrong. Please contact admin to get your email verified.',
                                email: '',
                                password: '',
                                isButtonDisabled: true,
                                error: ''
                            })
                        })

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
                            error: err.data.message,
                            successMesaage: ''
                        })
                        break;

                    default:
                        this.props.setLoading(false);
                        this.setState({
                            error: err.data.message,
                            successMesaage: ''
                        })
                        break;
                }
            }
        })
    }

    render() {
        const {
            isEmailValid,
            isPasswordValid,
            error,
            email,
            password,
            isButtonDisabled,
            successMesaage
        } = this.state;


        return (
            <div className="registration-form">
                <div className="form-header text-left">Registration Form</div>
                {error ? (
                    <div className="text-center text-danger pt-5"><b>{error}</b></div>
                ) : null}
                {successMesaage ? (
                    <div className="text-center text-primary pt-5"><b>{successMesaage}</b></div>
                ) : null}
                <form className="p-5" onSubmit={(e) => { this.submitForm(e); }}>
                    <div className="form-group d-flex flex-wrap">
                        <label htmlFor="email" className="col-sm-2 col-form-label">
                            Email
                                </label>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                autoFocus
                                value={email}
                                placeholder="Email"
                                onBlur={this.validateEmail}
                                onKeyDown={this.clearError}
                                onChange={this.handleChange}
                            />
                            {email.length === 0 ? null : isEmailValid ? null : (
                                <div className="text-danger text-left">
                                    Please enter a valid email
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group d-flex flex-wrap">
                        <label htmlFor="password" className="col-sm-2 col-form-label">
                            Password
                                </label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                value={password}
                                placeholder="Password"
                                onBlur={this.validatePassword}
                                onKeyDown={this.clearError}
                                onChange={this.handleChange}
                            />
                            {password.length === 0 ? null : isPasswordValid ? null : (
                                <div className="text-danger text-left">
                                    Please have 1 special character and min 6 chars
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        id="submit-btn"
                        className={`btn ${isButtonDisabled ? "btn-secondary" : "btn-primary"
                            }`}
                        disabled={isButtonDisabled}
                    >
                        Submit
                            </button>
                </form>
            </div>
        );

    }
}

const mapDispatchToProps = {
    setLoading: setLoading
}

export default connect(null, mapDispatchToProps)(RegistrationForm);
