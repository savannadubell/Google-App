import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ path }) => {
  const activeLinkClasses = "nav-item active";
  const inactiveLinkClasses = "nav-item";
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        (React) Google Books
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li
            className={path === "/" ? activeLinkClasses : inactiveLinkClasses}
          >
            <Link className="nav-link" to="/">
              Search
            </Link>
          </li>
          <li
            className={
              path === "/saved" ? activeLinkClasses : inactiveLinkClasses
            }
          >
            <Link className="nav-link" to="/saved">
              Saved
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Navbar;
