import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchBooksFetchData } from "../actions";

class SearchBox extends Component {
  state = {
    query: "",
  };

  handleChange = e => {
    e.preventDefault();
    const query = e.target.value;
    this.setState({
      query,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { searchBooks } = this.props;
    if (!query.trim()) {
      return;
    }
    searchBooks(query);
  };

  render() {
    const { query } = this.state;
    const { isLoading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              onChange={this.handleChange}
              value={query}
              name="query"
              type="text"
              className="form-control"
              placeholder="Book title"
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? "Searching " : "Search"}</span>
                {isLoading && <i className="fas fa-circle-notch fa-spin" />}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

SearchBox.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchBooks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.searchBooksIsLoading,
});

const mapDispatchToProps = dispatch => ({
  searchBooks: query => dispatch(searchBooksFetchData(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);