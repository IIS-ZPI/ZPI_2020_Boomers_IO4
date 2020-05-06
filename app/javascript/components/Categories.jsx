import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("/categories")
      .then(function (response) {
        setCategories(response.data);
        console.log(response);
      })
      .catch(function (error) {
        setCategories([]);
        console.log(error);
      });
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr>
            <td>{category.id}</td>
            <td>{category.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Categories;
