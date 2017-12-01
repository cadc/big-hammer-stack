import React from "react";
import ReactDOM from "react-dom";
import { Login, wrongCredentialsError } from "./index";
import { Router } from "react-router-dom";
import { history } from "common/history";
import { authenticate } from "api/authentication";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Router history={history}>
            <Login authenticate={authenticate} />
        </Router>, div);
});

it("handles error", () => {
    const div = document.createElement("div");
    const login = shallow(<Login authenticate={authenticate} router={{}} />);
    login.instance().handleError();
    expect(login.state().error).to.equal(wrongCredentialsError);
});
