import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchBook from "./SearchBook";

class SearchList extends Component {
  componentDidMount() {}

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
      // TODO find way to read query to determine if search was performed
      return <p>No results.</p>;
    }

    return (
      <ul className="list-group">
        {books.map(book => (
          <SearchBook key={book.googleBooksId} {...book} isSaved={false} />
        ))}
      </ul>
    );
  }
}

SearchList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
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
  isLoading: state.searchBooksIsLoading,
  hasErrored: state.searchBooksHasErrored,
  books: state.searchBooks,
});

export default connect(mapStateToProps)(SearchList);