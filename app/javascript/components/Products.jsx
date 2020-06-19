import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [searchTermProducts, setSearchTermProducts] = useState("");
  const [searchResultsProducts, setSearchResultsProducts] = useState(null);

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

  useEffect(() => {
    if (products) {
      const results = products.filter(
        (product) =>
        (product.id.toString().includes(searchTermProducts.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTermProducts.toLowerCase()))
      );
      if(results.length)
      {
        setSearchResultsProducts(results);

      }else
      {
        setSearchResultsProducts(null);

      }
    }
  }, [searchTermProducts, products]);
  
  return (
    <>
    <Jumbotron className="jumboman2">
        <Container fluid style={{maxwidth: '100%'}}>
          <FormControl
                          style = {{width: "90vh"}}
                          autoFocus
                          className="shadow my-2 w-100"
                          placeholder="Type to filter..."
                          onChange={(e) => setSearchTermProducts(e.target.value)}
                          value={searchTermProducts}
                      />
          <Card>
                <Card.Header>
                <Row>
            <Col>
              No.
            </Col>
            <Col>
              Product name
            </Col>
            <Col>
              Price
            </Col>
          </Row>
                </Card.Header>
              </Card>
          
          <Accordion defaultActiveKey="0">
            {products && searchResultsProducts && (
              searchResultsProducts.map((product) => (
              <Card key={product.id}>
                <Accordion.Toggle as={Card.Header} eventKey={product.id}>
                  <Row>
                    <Col>
                      {product.id}
                    </Col>
                    <Col>
                      {product.name}
                    </Col>
                    <Col>
                    {product.price}
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={product.id}>
                  <Card.Body>{product.price}</Card.Body>
                </Accordion.Collapse>
              </Card>
              ))
             )}
          </Accordion>
        </Container></Jumbotron>
    </>
  );
};

export default Products;
