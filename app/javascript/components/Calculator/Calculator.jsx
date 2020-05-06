import React, { useState, useEffect, Children } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";

const Calculator = (props) => {
  const [categories, setCategories] = useState(null);
  const [states, setStates] = useState(null);
  const [products, setProducts] = useState(null);
  const [tool, setTool] = useState(1);
  const [searchTermStates, setSearchTermStates] = useState("");
  const [searchResultsStates, setSearchResultsStates] = useState(null);
  const [searchTermCategories, setSearchTermCategories] = useState("");
  const [searchResultsCategories, setSearchResultsCategories] = useState(null);
  const [searchTermProducts, setSearchTermProducts] = useState("");
  const [searchResultsProducts, setSearchResultsProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [state, setState] = useState(null);
  const [amountOfProducts, setAmountOfProducts] = useState(0);



  
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
    
      var url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=Sales%20taxes%20in%20the%20United%20States';
      
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(response){
          var html_code = response["parse"]["text"]["*"];
          var parser = new DOMParser();
          var html = parser.parseFromString(html_code, "text/html");
          var tables = html.querySelectorAll(".wikitable");
          var results = [];
          for (let i = 1; i < 54; i++) { 
            results.push({id: i, name: tables[1].children[0].children[i].children[0].innerText}); 
          } 
        console.log(results);
        setStates(results);
        })





  }, []);

  useEffect(() => {

    if (categories) {
    setCategory(categories[0]);
      const results = categories.filter(
        (category) =>
        category.id.toString().includes(searchTermCategories.toLowerCase()) ||
        category.name.toLowerCase().includes(searchTermCategories.toLowerCase())
      );
      setSearchResultsCategories(results);
    }
  }, [searchTermCategories, categories]);

  useEffect(() => {
    if (states) {
      const results = states.filter(
        (state) =>
        state.id.toString().includes(searchTermStates.toLowerCase()) ||
        state.name.toLowerCase().includes(searchTermStates.toLowerCase())
      );
      setSearchResultsStates(results);
    }
  }, [searchTermStates, states]);

  useEffect(() => {
    if (products) {
      const results = products.filter(
        (product) =>
        product.category_id == category.id &&
        (product.id.toString().includes(searchTermProducts.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTermProducts.toLowerCase()))
      );
      setSearchResultsProducts(results);
    }
  }, [searchTermProducts, products, category]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);


  return (
    <Jumbotron className="jumboman">
        <Container fluid style={{maxwidth: '100%'}}>
          <Row>
            <Col className="columns">
            <Row style={{ height: "82vh", margin: "0px" }}>
                <Col className="columns">
                    <FormControl
                        style = {{width: "98%"}}
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setSearchTermStates(e.target.value)}
                        value={searchTermStates}
                    />
                    {states && searchResultsStates && (
                    <ListGroup
                      style={{overflowY: "scroll",
                        maxHeight: "82vh",}}
                        defaultActiveKey={searchResultsStates[0].id}
                        onSelect={(k) => setTool(k)}
                    >
                        {searchResultsStates.map((state) => (
                        <ListGroup.Item action key={state.id} eventKey={state.id} onClick={() => {
                          setState(state);
                        }}>
                        {state.name}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </Col>
                <Col className="columns">
                <FormControl
                        style = {{width: "98%"}}
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setSearchTermCategories(e.target.value)}
                        value={searchTermCategories}
                    />
                    {categories && searchResultsCategories && (
                    <ListGroup
                        style={{overflowY: "scroll",
                        maxHeight: "82vh",}}
                        defaultActiveKey={searchResultsCategories[0].id}
                        onSelect={(k) => setTool(k) }
                    >
                        {searchResultsCategories.map((category) => (
                        <ListGroup.Item action key={category.id} eventKey={category.id} onClick={() => {
                          setCategory(category);
                        }}>
                        {category.name}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </Col>
                <Col className="columns">
                <FormControl
                        style = {{width: "98%"}}
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setSearchTermProducts(e.target.value)}
                        value={searchTermProducts}
                    />
                    {products && searchResultsProducts && (
                    <ListGroup
                        style={{overflowY: "scroll",
                        maxHeight: "82vh",}}
                        defaultActiveKey={searchResultsProducts[0].id}
                        onSelect={(k) => setTool(k)}
                    >
                        {searchResultsProducts.map((product) => (
                        <ListGroup.Item action key={product.id} eventKey={product.id} onClick={() => {
                          setProduct(product);
                        }}>
                        {product.name}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </Col>
                </Row>
            </Col>
            <Col className="priceColumn">
            Amount of Products
            <FormControl
                        style = {{width: "98%"}}
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Amount"
                        onChange={(e) => setAmountOfProducts(e.target.value)}
                        value={amountOfProducts}
                    />
                    <br/>
            <Jumbotron className="jumboman-price">
                  <h1>Price</h1>
                  <br/>
                  {product && state && (<p>Price of {amountOfProducts} {product.name}s in {state.name} is {amountOfProducts*product.price} dollars</p>)}
                      
            </Jumbotron>
            </Col>
          </Row>
        </Container>
    </Jumbotron>
  );
};

export default Calculator;