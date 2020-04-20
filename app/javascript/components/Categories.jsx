import React from "react"
import PropTypes from "prop-types"
class Categories extends React.Component {
  render () {
    return (
      <React.Fragment>
        Categories: {this.props.categories}
      </React.Fragment>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array
};
export default Categories
