import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

function AddModal(props) {
  const {
    addProduct,
    categories,
    setSelectedCategory,
    selectedCategory,
    ...rest
  } = props;
  return (
    <Modal
      {...rest}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adding new product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Price" />
          </Form.Group>
        </Form>
        <Dropdown>
          {selectedCategory === null ? (
            <Dropdown.Toggle block>Choose</Dropdown.Toggle>
          ) : (
            <Dropdown.Toggle block>{selectedCategory.name}</Dropdown.Toggle>
          )}
          <Dropdown.Menu>
            <ul
              style={{
                overflowY: "scroll",
                maxHeight: "200px",
                margin: "0px",
                padding: "0px",
              }}
            >
              {categories &&
                categories.map((category) => (
                  <Dropdown.Item
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => {
            addProduct(
              document.getElementById("formName").value,
              document.getElementById("formPrice").value
            );
            props.onHide();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal(props) {
  const { selectedProduct, setSelectedProduct, deleteProduct, ...rest } = props;

  if (props.selectedProduct) {
    return (
      <Modal
        {...rest}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deleting {selectedProduct.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ textAlign: "center" }}>Are you sure?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteProduct(selectedProduct);
              setSelectedProduct(null);

              props.onHide();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else return <></>;
}

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [searchTermProducts, setSearchTermProducts] = useState("");
  const [searchResultsProducts, setSearchResultsProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

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
    if (products) {
      const results = products.filter(
        (product) =>
          product.id.toString().includes(searchTermProducts.toLowerCase()) ||
          product.name.toLowerCase().includes(searchTermProducts.toLowerCase())
      );
      if (results.length) {
        setSearchResultsProducts(results);
      } else {
        setSearchResultsProducts(null);
      }
    }
  }, [searchTermProducts, products]);

  const addProduct = (name, price) => {
    const product = {
      name: name,
      price: parseFloat(price),
      category_id: selectedCategory.id,
    };
    const link = "categories/" + selectedCategory.id + "/products";
    console.log(link);
    axios.post(link, { product }).then((res) => {
      console.log(res);
      console.log(res.data);
      setProducts([...products, res.data]);
    });
  };

  const deleteProduct = (product) => {
    const link =
      "categories/" + product.category_id + "/products/" + product.id;
    axios.delete(link).then((res) => {
      console.log(res);
    });
    setProducts((currentProducts) =>
      currentProducts.filter((products) => products.id !== product.id)
    );
  };

  const getCategoryName = (category_id) => {
    const result = categories.filter((category) => category.id === category_id);
    return result[0].name;
  };

  return (
    <>
      <AddModal
        show={addModalShow}
        onHide={() => {
          setAddModalShow(false);
        }}
        addProduct={addProduct}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <DeleteModal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
        }}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        deleteProduct={deleteProduct}
      />
      <Jumbotron className="jumboman2">
        <Container fluid style={{ maxwidth: "100%" }}>
          <FormControl
            style={{ width: "90vh" }}
            autoFocus
            className="shadow my-2 w-100"
            placeholder="Type to filter..."
            onChange={(e) => setSearchTermProducts(e.target.value)}
            value={searchTermProducts}
          />
          <Card className="bg-secondary text-white">
            <Card.Header>
              <Row>
                <Col>No.</Col>
                <Col>Product name</Col>
                <Col>Price (dollars)</Col>
              </Row>
            </Card.Header>
          </Card>

          <Accordion
            defaultActiveKey="0"
            style={{
              overflowY: "scroll",
              maxHeight: "70vh",
            }}
          >
            {products &&
              searchResultsProducts &&
              searchResultsProducts.map((product) => (
                <Card key={product.id}>
                  <Accordion.Toggle as={Card.Header} eventKey={product.id}>
                    <Row>
                      <Col>{product.id}</Col>
                      <Col>{product.name}</Col>
                      <Col>{product.price + " $"}</Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={product.id}>
                    <Card.Body>
                      <Row>
                        <Col>
                          <p>
                            Category: {getCategoryName(product.category_id)}
                          </p>
                          <p>Name: {product.name}</p>
                          <p>Price: {product.price}</p>
                        </Col>
                        <Col>
                          <Button
                            className="btn-danger"
                            style={{ float: "right" }}
                            onClick={() => {
                              setSelectedProduct(product);
                              setDeleteModalShow(true);
                            }}
                          >
                            {"\u00a0\u00a0\u00a0"}Delete{"\u00a0\u00a0\u00a0"}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
          <Card>
            <Card.Header>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                  <Button
                    className="btn-success"
                    style={{ float: "right" }}
                    onClick={() => setAddModalShow(true)}
                  >
                    {"\u00a0\u00a0\u00a0"}ADD NEW{"\u00a0\u00a0\u00a0"}
                  </Button>
                </Col>
              </Row>
            </Card.Header>
          </Card>
        </Container>
      </Jumbotron>
    </>
  );
};

export default Products;
