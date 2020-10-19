import React from 'react';
import { render } from '@testing-library/react';

import Enzyme, { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import LoginForm from '../views/LandingPage/components/LoginForm'

let wrapper;

describe("Testing the login form", () => {
    beforeEach(() => {
        wrapper = mount(<LoginForm />);
    })
    
    test("login form heading to be 'Login Form'", () => {
        expect(wrapper.find(".form-header").text()).toContain("Login Form")
        wrapper.unmount()
    })

    test("Checking text on submit button", () => {
        expect(wrapper.find("button").props().children).toBe("Submit")
        wrapper.unmount()
    })

    test("Checking for email label text", () => {
        expect(wrapper.find("input")).toHaveLength(3)
        expect(wrapper.find("label").get(0).props.children).toBe("Email")
        wrapper.unmount()
    })
})
