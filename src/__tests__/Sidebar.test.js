import React from 'react';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import MetisMenu from "react-metismenu";

import Enzyme, { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Sidebar from '../views/HomePage/components/Sidebar'

let wrapper;
describe("dashboard sidebar test for admin user", () => {
    beforeEach(() => {
        wrapper = mount(<Sidebar admin={true}/>)
    })
    test("Should display sidebar elements",() => {
        expect(wrapper.find("MetisMenu")).toBeDefined();
        expect(wrapper.find("MetisMenu").props().content).toHaveLength(4)
        expect(wrapper.find("DefaultLink").at(0).props().label).toBe("Dashboard")
        wrapper.unmount()
    })
})


describe("dashboard sidebar test for customer", () => {
    beforeEach(() => {
        wrapper = mount(<Sidebar admin={false}/>)
    })
    test("Should display sidebar elements",() => {
        expect(wrapper.find("MetisMenu")).toBeDefined();
        expect(wrapper.find("MetisMenu").props().content).toHaveLength(3)
        expect(wrapper.find("DefaultLink").at(0).props().label).toBe("Dashboard")
        wrapper.unmount()
    })
})
