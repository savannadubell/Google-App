import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SavedList from "../containers/SavedList";

const SavedPage = ({ location }) => (
  <div>
    <Navbar path={location.pathname} />
    <div className="container">
      <SavedList />
    </div>
  </div>
);

SavedPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SavedPage;