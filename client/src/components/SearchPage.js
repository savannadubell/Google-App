import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SearchBox from "../containers/SearchBox";
import SearchList from "../containers/SearchList";

const SearchPage = ({ location }) => (
  <div>
    <Navbar path={location.pathname} />
    <div className="container">
      <div className="row">
        <div className="d-flex flex-column justify-content-center col">
          <SearchBox />
          <SearchList />
        </div>
      </div>
    </div>
  </div>
);

SearchPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SearchPage;