import React, { Component } from 'react';
import { emailRegex, loginPasswordRegex } from '../../../constants/regex';
import emailjs from 'emailjs-com';
import { admin, baseUrl, register } from '../../../constants/endpoints';

class AdminReg extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isEmailValid: true,
            isPasswordValid: true,
            error: '',
            success: ''
        }
        this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        let { email, password } = this.state;

        let data = {
            email,
            password
        }
        this.registerUser(data);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    resetForm() {
        this.setState({
            email: '',
            password: ''
        });
    }

    validateEmail = (e) => {
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
            isEmailValid
        })
    }

    validatePassword = (e) => {
        let isPasswordValid = loginPasswordRegex.test(e.target.value);
        let elem = document.getElementById(e.target.id);
        if (isPasswordValid && e.target.value.length >= 6) {
            elem.style.borderColor = '#28A745';
            elem.style.boxShadow = "0 0 1px 1px #28A745"
        } else {
            elem.style.borderColor = 'rgba(220,53,69,0.37)'
            elem.style.boxShadow = "0 0 1px 1px rgba(220,53,69,0.37)"
        }
        this.setState({
            isPasswordValid
        })
    }


    registerUser = async (data) => {
        let response = await fetch(`${baseUrl}${admin}${register}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let output = await response.text();
        switch (output) {
            case 'Admin inserted successfully':
                this.setState({
                    success: output,
                    error: ''
                })
                const templateParams = {
                    to_email: `${data.email}`,
                    subject: `You are now an admin of Credibuddy!`,
                };
                emailjs.send(
                    'gmail',
                    'template_76to8yd',
                    templateParams,
                    'user_gXHcJkG09Ujt4JMUpUSdi'
                ).then((result) => {
                    let s = `Admin with email ${data.email}, created successfully . A confirmation mail is sent to the mentioned email id`;
                    this.setState({
                        success: s,
                        error: ''
                    })
                }, (error) => {
                    let s = `Admin registered successfully but email was not sent. Please send the email manually. Dont forgot to mention password, ${data.password} in the email`
                    this.setState({
                        error: s,
                        success: ''
                    })
                });
                this.resetForm();
                break;
            case 'email id already exists!':
                this.setState({
                    error: output,
                    success: ''
                })
                break;

            default:
                alert("Something went wrong");
                break;
        }
        return output;
    }

    render() {
        const { isEmailValid, isPasswordValid, error, success, email, password } = this.state
        return (
            <div className="sidebar-offset">
                <div className="text-center landing-main-content d-flex flex-column justify-content-center">
                    <div className="login-form">
                        <div className="form-header text-left">
                        </div>
                        {error ?
                            <div className="text-center text-danger pt-5">
                                {error}
                            </div>
                            :
                            null
                        }
                        {success ?
                            <div className="text-center text-success pt-5">
                                {success}
                            </div>
                            :
                            null
                        }
                        <form className="p-5" onSubmit={(e) => { this.submitForm(e) }}>
                            <div className="form-group d-flex flex-wrap">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Email" onBlur={this.validateEmail} onChange={this.handleChange} />
                                    {isEmailValid ? null : <div className="text-danger text-left">Please enter a valid email</div>}
                                </div>
                            </div>

                            <div className="form-group d-flex flex-wrap">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" name="password" id="password" value={password} placeholder="Password" onBlur={this.validatePassword} onChange={this.handleChange} />
                                    {isPasswordValid ? null : <div className="text-danger text-left">Please have 1 special character and min 6 chars</div>}
                                </div>
                            </div>


                            <button type="submit" className={`btn btn-primary`}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default AdminReg;