import React, { useState, useEffect, Children } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form"

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
  const [amountOfProducts, setAmountOfProducts] = useState(1);
  const [priceOfSelling, setPriceOfSelling] = useState(0);
  const [costOfLogistics, setCostOfLogistics] = useState(0);
  const [sellingPriceNetto, setSellingPriceNetto] = useState(0);
  const [buyingPriceBrutto, setBuyingPriceBrutto] = useState(0);



  
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
          console.log(tables[1].children[0].children);
          for (let i = 1; i < 54; i++) { 
            results.push({id: i, name: tables[1].children[0].children[i].children[0].innerText,
            tax: tables[1].children[0].children[i].children[1].innerText.replace(/\D+$/g, "")}); 
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
    if(state && product)
    {
      setSellingPriceNetto((priceOfSelling-(priceOfSelling*state.tax/100))*amountOfProducts);
      setBuyingPriceBrutto((product.price+(product.price*state.tax/100))*amountOfProducts);
    }
  }, [amountOfProducts, priceOfSelling, costOfLogistics, state]);


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
            <Jumbotron className="jumboman-price">
              <Row>
                <Col>
                Product: {product ? product.name : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
                <Col>
                Category: {category ? category.name : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"} {"\u00a0\u00a0\u00a0"} 
                </Col>
                <Col>
                Taxes: {state ? state.tax+"%" : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>


              </Row>
              <hr />
              <Row xs={4} md={6} lg={8}>
                <Col>Amount (pieces):
                </Col>
                <Col >
                  <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Amount"
                        onChange={(e) => setAmountOfProducts(e.target.value)}
                        value={amountOfProducts}
                    />
                </Col>
              </Row>
              <Row xs={4} md={6} lg={8}>
                <Col>Price of selling (zł):
                </Col>
                <Col >
                  <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="price"
                        onChange={(e) => setPriceOfSelling(e.target.value)}
                        value={priceOfSelling}
                    />
                </Col>
              </Row>
              <Row xs={4} md={6} lg={8}>
                <Col>Cost of logistics (zł):
                </Col>
                <Col >
                  <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="price"
                        onChange={(e) => setCostOfLogistics(e.target.value)}
                        value={costOfLogistics}
                    />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                Started price(netto): {product ? product.price +"zł * "+ amountOfProducts +" pieces = "+ product.price*amountOfProducts +" zł": "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                
                </Col>
              </Row>
              <Row>
                <Col>
                Started price(brutto): {product && state ? "( " + product.price +"zł + ( " + product.price +"zł * " + state.tax + "% )) * " + amountOfProducts +" pieces = "+ 
                buyingPriceBrutto.toFixed(2) +" zł": "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                Selling price(netto): {product && state ? "( " + priceOfSelling +"zł - ( " + priceOfSelling +"zł * " + state.tax + "% )) * " + amountOfProducts +" pieces = "+ 
                sellingPriceNetto.toFixed(2) +" zł": "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                
                </Col>
              </Row>
              
              <Row>
                <Col>
                Selling price(brutto): {product ? priceOfSelling +"zł * "+ amountOfProducts +" = "+ (priceOfSelling*amountOfProducts).toFixed(2) +" zł": "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                Profit: {product ? sellingPriceNetto.toFixed(2) +"zł - "+ costOfLogistics + "zł - "
                 + buyingPriceBrutto.toFixed(2)  +"zł = "
                 + (sellingPriceNetto-buyingPriceBrutto-costOfLogistics).toFixed(2) +" zł": "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                
                </Col>
              </Row>                 
            </Jumbotron>
            </Col>
          </Row>
        </Container>
    </Jumbotron>
  );
};

export default Calculator;