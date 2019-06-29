import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToSavedBooks } from "../actions";

const SearchBook = ({
  _id,
  googleBooksId,
  title,
  authors,
  description,
  image,
  link,
  isLoading,
  saveBook,
}) => (
  <li className="list-group-item">
    <div className="container">
      <div className="row d-flex justify-content-between mb-1">
        <div>
          <h5 className="mb-1">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1"
            >
              {title}
            </a>
          </h5>
          {/* // TODO add subtitles*/}
          {/* // TODO combine with SavedBook?*/}
          <small className="text-muted">
            {authors ? authors.join(", ") : "Unknown"}
          </small>
        </div>
        <div>
          {_id ? (
            <button type="button" className="btn btn-success" disabled>
              <span>Saved </span>
              <i className="fas fa-check" />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              disabled={isLoading}
              onClick={e => {
                e.preventDefault();
                saveBook({
                  googleBooksId,
                  title,
                  authors,
                  description,
                  image,
                  link,
                });
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <img
            src={image || "https://via.placeholder.com/150x200?text=No+image"}
            alt={image ? title : "Missing thumbnail"}
          />
        </div>
        <div className="col-10">
          <p>{description}</p>
        </div>
      </div>
    </div>
  </li>
);

SearchBook.propTypes = {
  _id: PropTypes.string,
  googleBooksId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  saveBook: PropTypes.func.isRequired,
};

SearchBook.defaultProps = {
  _id: "",
  description: "",
  image: "",
  link: "",
};

const mapStateToProps = state => ({
  isLoading: state.savedBooksIsLoading,
});

const mapDispatchToProps = dispatch => ({
  saveBook: bookId => dispatch(addToSavedBooks(bookId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBook);