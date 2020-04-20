import React from "react"
import PropTypes from "prop-types"
class Products extends React.Component {
  render () {
    return (
      <React.Fragment>
        Products: {this.props.products}
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array
};
export default Products
