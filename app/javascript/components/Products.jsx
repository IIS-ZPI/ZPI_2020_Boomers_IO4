import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return <h1>Products</h1>;
};

export default Products;
