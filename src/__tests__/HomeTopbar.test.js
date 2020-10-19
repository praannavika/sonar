import React from 'react';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';


import Enzyme, { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HomeTopBar from '../views/HomePage/components/HomeTopBar'

configure({ adapter: new Adapter() });

let wrapper;
describe("home top bar test", () => {
    
    beforeEach(() => {
        wrapper = shallow(<HomeTopBar />);
    })
    test("should display welcome message", () => {
        let wrapper = shallow(<HomeTopBar />);
        expect(wrapper.find("h6").text()).toContain("Welcome");
    })

    test("dropdown should show Settings and Logout options", () => {
        expect(wrapper.find("ul")).toBeDefined()
        expect(wrapper.find("Link")).toHaveLength(2)
        expect(wrapper.find("Link").at(0).props().children).toBe("Settings")
        expect(wrapper.find("Link").at(1).props().children).toBe("Logout")
        expect(wrapper.find("Link").at(1).props().to).toBe("/home")
    })
})
