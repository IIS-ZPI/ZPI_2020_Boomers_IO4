import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then(function (response) {
        setProducts(response.data);
        console.log(response);
      })
      .catch(function (error) {
        setProducts([]);
        console.log(error);
      });
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Products;
