import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";

const Calculator = (props) => {
  const [categories, setCategories] = useState(null);
  const [tool, setTool] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

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

  useEffect(() => {
    if (categories) {
      const results = categories.filter(
        (category) =>
        category.id.toString().includes(searchTerm.toLowerCase()) ||
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, categories]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);


  return (
    <Jumbotron className="jumboman">
        <Container fluid style={{maxwidth: '100%'}}>
            <Row style={{ height: "60vh", margin: "0px" }}>
                <Col>
                    <FormControl
                        style = {{width: "98%"}}
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    {categories && searchResults && (
                    <ListGroup
                        defaultActiveKey={searchResults[0].id}
                        onSelect={(k) => setTool(k)}
                    >
                        {searchResults.map((category) => (
                        <ListGroup.Item action key={category.id} eventKey={category.id}>
                        {category.name}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </Col>
                <Col>
                Column2
                </Col>
                <Col>
                Column3
                </Col>
                <Col>
                Column4
                </Col>
            </Row>
        </Container>
    </Jumbotron>
  );
};

export default Calculator;