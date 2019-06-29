import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SavedBook from "./SavedBook";
import { savedBooksFetchData } from "../actions";

class SavedList extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { isLoading, hasErrored, books } = this.props;
    if (hasErrored) {
      return <p>Error! Try reloading the page.</p>;
    }

    if (isLoading) {
      return (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <i className="fas fa-spinner fa-spin fa-3x" />
          </div>
        </div>
      );
    }

    if (!books.length) {
      return <p>No saved books!</p>;
    }

    return (
      <ul className="list-group">
        {books.map(book => (
          <SavedBook key={book.googleBooksId} {...book} />
        ))}
      </ul>
    );
  }
}

SavedList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      googleBooksId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.savedBooksIsLoading,
  hasErrored: state.savedBooksHasErrored,
  books: state.savedBooks,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(savedBooksFetchData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedList);
