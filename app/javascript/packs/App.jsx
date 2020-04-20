import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";

const Hello = (props) => <h1>Hello d{props.name}!</h1>;

Hello.defaultProps = {
  name: "David",
};

Hello.propTypes = {
  name: PropTypes.string,
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement("div"))
  );
});
