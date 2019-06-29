import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteSavedBook } from "../actions";

const SavedBook = ({
  _id,
  googleBooksId,
  title,
  authors,
  description,
  image,
  link,
  isLoading,
  deleteBook,
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
          {/* // TODO combine with SearchBook?*/}
          <small className="text-muted">
            {authors ? authors.join(", ") : "Unknown"}
          </small>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={e => {
              e.preventDefault();
              deleteBook(_id);
            }}
          >
            Delete
          </button>
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

SavedBook.propTypes = {
  _id: PropTypes.string.isRequired,
  googleBooksId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

SavedBook.defaultProps = {
  description: "",
  image: "",
  link: "",
};

const mapStateToProps = state => ({
  isLoading: state.savedBooksIsLoading,
});

const mapDispatchToProps = dispatch => ({
  deleteBook: bookId => dispatch(deleteSavedBook(bookId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedBook);
