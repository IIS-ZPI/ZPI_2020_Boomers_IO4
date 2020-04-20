import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/style.scss";

import NavBar from "../components/NavBar";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Container from "react-bootstrap/Container";

const App = (props) => {
  const [tab, setTab] = useState("categories");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  return (
    <>
      <NavBar selected={tab} setSelected={setTab} />
      <Container>
        {tab === "categories" && <Categories />}
        {tab === "products" && <Products />}
      </Container>
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
