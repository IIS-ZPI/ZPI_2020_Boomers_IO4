import React, { useState, useEffect, Children } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

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
  const [taxValue, setTaxValue] = useState(null);
  const [taxVal, setTaxVal] = useState(0);

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

    var url =
      "https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=Sales%20taxes%20in%20the%20United%20States";

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var html_code = response["parse"]["text"]["*"];
        var parser = new DOMParser();
        var html = parser.parseFromString(html_code, "text/html");
        var tables = html.querySelectorAll(".wikitable");
        parseTable(tables);
      });
  }, []);

  useEffect(() => {
    if (categories) {
      setCategory(categories[0]);
      const results = categories.filter(
        (category) =>
          category.id.toString().includes(searchTermCategories.toLowerCase()) ||
          category.name
            .toLowerCase()
            .includes(searchTermCategories.toLowerCase())
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
    if (products && category) {
      const results = products.filter(
        (product) =>
          product.category_id == category.id &&
          (product.id.toString().includes(searchTermProducts.toLowerCase()) ||
            product.name
              .toLowerCase()
              .includes(searchTermProducts.toLowerCase()))
      );
      if (results.length) {
        setSearchResultsProducts(results);
      } else {
        setSearchResultsProducts(null);
      }
    }
  }, [searchTermProducts, products, category]);

  useEffect(() => {
    if (state && product) {
      for (var key in state.categories) {
        if (!state.categories.hasOwnProperty(key)) continue;

        if (key == category.name) {
          if (state.categories[key] == "blue") {
            if (state.categories[key + "N"] != "") {
              setTaxVal(parseFloat(state.categories[key + "N"]));
            } else {
              console.log(state.tax);
              setTaxVal(state.tax);
            }
          } else if (state.categories[key] == "green") {
            if (state.categories[key + "N"] != "") {
              if (parseFloat(state.categories[key + "N"]) < priceOfSelling) {
                setTaxVal(state.tax);
              } else {
                setTaxVal(0);
              }
            } else {
              setTaxVal(0);
            }
          } else if (state.categories[key] == "red") {
            setTaxVal(0);
          }
          setSellingPriceNetto(
            (priceOfSelling - (priceOfSelling * taxVal) / 100) *
              amountOfProducts
          );
          setBuyingPriceBrutto(
            (product.price + (product.price * taxVal) / 100) * amountOfProducts
          );
          break;
        }
      }
    }
    if (state && category) {
      for (var key in state.categories) {
        if (!state.categories.hasOwnProperty(key)) continue;

        if (key == category.name) {
          if (state.categories[key] == "blue") {
            setTaxValue(state.tax + "%");
          } else if (state.categories[key] == "green") {
            setTaxValue("Exempt from taxes");
          } else if (state.categories[key] == "red") {
            setTaxValue("No taxes");
          }
          break;
        }
      }
    }
  }, [state, category, amountOfProducts, priceOfSelling, costOfLogistics]);

  const parseTable = (tables) => {
    var results = [];
    for (let i = 1; i < 54; i++) {
      var tempCateg = [];
      for (let j = 3; j < 9; j++) {
        if (tables[1].children[0].children[i].children[j]) {
          if (
            tables[1].children[0].children[i].children[j].style
              .backgroundColor == "rgb(119, 136, 255)"
          ) {
            tempCateg.push("blue");
          } else if (
            tables[1].children[0].children[i].children[j].style
              .backgroundColor == "rgb(246, 43, 15)"
          ) {
            tempCateg.push("red");
          } else if (
            tables[1].children[0].children[i].children[j].style
              .backgroundColor == "rgb(78, 224, 78)"
          ) {
            tempCateg.push("green");
          }
          tempCateg.push(
            tables[1].children[0].children[i].children[j].innerText.replace(
              /[^\d.]/g,
              ""
            )
          );
        }
      }
      var categoriesArray = {
        Groceries: tempCateg[0],
        GroceriesN: tempCateg[1],
        "Prepared food": tempCateg[2],
        "Prepared foodN": tempCateg[3],
        "Prescription drug": tempCateg[4],
        "Prescription drugN": tempCateg[5],
        "Non-prescription drug": tempCateg[6],
        "Non-prescription drugN": tempCateg[7],
        Clothing: tempCateg[8],
        ClothingN: tempCateg[9],
        Intagibles: tempCateg[10],
        IntagiblesN: tempCateg[11],
      };

      results.push({
        id: i,
        name: tables[1].children[0].children[i].children[0].innerText,
        tax: tables[1].children[0].children[i].children[1].innerText.replace(
          /\D+$/g,
          ""
        ),
        categories: categoriesArray,
      });
    }
    console.log(results);
    setStates(results);
  };

  return (
    <Jumbotron className="jumboman">
      <Container fluid style={{ maxwidth: "100%" }}>
        <Row>
          <Col className="columns">
            <Row style={{ height: "82vh", margin: "0px" }}>
              <Col className="columns">
                <FormControl
                  style={{ width: "98%" }}
                  autoFocus
                  className="mx-3 my-2 w-auto shadow"
                  placeholder="Type to filter..."
                  onChange={(e) => setSearchTermStates(e.target.value)}
                  value={searchTermStates}
                />
                {states && searchResultsStates && (
                  <ListGroup
                    style={{ overflowY: "scroll", maxHeight: "82vh" }}
                    defaultActiveKey={
                      searchTermStates.size === 0
                        ? null
                        : searchResultsStates[0].id
                    }
                    onSelect={(k) => setTool(k)}
                  >
                    {searchResultsStates.map((state) => (
                      <ListGroup.Item
                        action
                        key={state.id}
                        eventKey={state.id}
                        onClick={() => {
                          setState(state);
                        }}
                      >
                        {state.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>
              <Col className="columns">
                <FormControl
                  style={{ width: "98%" }}
                  autoFocus
                  className="mx-3 my-2 w-auto shadow"
                  placeholder="Type to filter..."
                  onChange={(e) => setSearchTermCategories(e.target.value)}
                  value={searchTermCategories}
                />
                {categories && searchResultsCategories && (
                  <ListGroup
                    style={{ overflowY: "scroll", maxHeight: "82vh" }}
                    defaultActiveKey={
                      searchTermCategories.size === 0
                        ? null
                        : searchResultsCategories[0].id
                    }
                    onSelect={(k) => setTool(k)}
                  >
                    {searchResultsCategories.map((category) => (
                      <ListGroup.Item
                        action
                        key={category.id}
                        eventKey={category.id}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        {category.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>
              <Col className="columns">
                <FormControl
                  style={{ width: "98%" }}
                  autoFocus
                  className="mx-3 my-2 w-auto shadow"
                  placeholder="Type to filter..."
                  onChange={(e) => setSearchTermProducts(e.target.value)}
                  value={searchTermProducts}
                />
                {products && searchResultsProducts && (
                  <ListGroup
                    style={{ overflowY: "scroll", maxHeight: "82vh" }}
                    defaultActiveKey={
                      searchResultsProducts.size === 0
                        ? null
                        : searchResultsProducts[0].id
                    }
                    onSelect={(k) => setTool(k)}
                  >
                    {searchResultsProducts.map((product) => (
                      <ListGroup.Item
                        action
                        key={product.id}
                        eventKey={product.id}
                        onClick={() => {
                          setProduct(product);
                        }}
                      >
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
                  State:{" "}
                  {state ? state.name : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>

                <Col>
                  Taxes:{" "}
                  {state ? taxValue : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
                <Col>
                  Category:{" "}
                  {category
                    ? category.name
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}{" "}
                  {"\u00a0\u00a0\u00a0"}
                </Col>
                <Col>
                  Product:{" "}
                  {product
                    ? product.name
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
              </Row>
              <hr />
              <Row xs={4} md={6} lg={8}>
                <Col>Amount (pieces):</Col>
                <Col>
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
                <Col>Price of selling (zł):</Col>
                <Col>
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
                <Col>Cost of logistics (zł):</Col>
                <Col>
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
                  Started price(netto):{" "}
                  {product
                    ? product.price +
                      "zł * " +
                      amountOfProducts +
                      " pieces = " +
                      product.price * amountOfProducts +
                      " zł"
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
              </Row>
              <Row>
                <Col>
                  Started price(brutto):{" "}
                  {product && state
                    ? "( " +
                      product.price +
                      "zł + ( " +
                      product.price +
                      "zł * " +
                      taxVal +
                      "% )) * " +
                      amountOfProducts +
                      " pieces = " +
                      buyingPriceBrutto.toFixed(2) +
                      " zł"
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  Selling price(netto):{" "}
                  {product && state
                    ? "( " +
                      priceOfSelling +
                      "zł - ( " +
                      priceOfSelling +
                      "zł * " +
                      taxVal +
                      "% )) * " +
                      amountOfProducts +
                      " pieces = " +
                      sellingPriceNetto.toFixed(2) +
                      " zł"
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
              </Row>

              <Row>
                <Col>
                  Selling price(brutto):{" "}
                  {product
                    ? priceOfSelling +
                      "zł * " +
                      amountOfProducts +
                      " = " +
                      (priceOfSelling * amountOfProducts).toFixed(2) +
                      " zł"
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  Profit:{" "}
                  {product
                    ? sellingPriceNetto.toFixed(2) +
                      "zł - " +
                      costOfLogistics +
                      "zł - " +
                      buyingPriceBrutto.toFixed(2) +
                      "zł = " +
                      (
                        sellingPriceNetto -
                        buyingPriceBrutto -
                        costOfLogistics
                      ).toFixed(2) +
                      " zł"
                    : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
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
