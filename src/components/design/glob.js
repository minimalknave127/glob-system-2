import React from "react";
import PropTypes from "prop-types";
import { Title } from "./glob-pack/title";
import Header from "./glob-pack/header";
export const GlobTitle = (props) => {
  return <Title {...props} />;
};
export const GlobHeader = (props) => <Header {...props} />;
GlobTitle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
};
GlobHeader.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  desc: PropTypes.string,
};
