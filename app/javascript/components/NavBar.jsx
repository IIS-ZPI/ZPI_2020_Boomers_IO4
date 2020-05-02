import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = ({ selected, setSelected }) => {
  return (
    <Navbar className="navigation"  variant="dark" >
      <Navbar.Brand href="#home">USA Selling App</Navbar.Brand>
      <Nav
        activeKey={selected}
        className="mr-auto"
        onSelect={(selectedKey) => setSelected(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="calculator">Calculator</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="categories">Categories</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="products">Products</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavBar; 
