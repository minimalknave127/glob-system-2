import React from "react";
import PropTypes from "prop-types";
import { Title } from "./glob-pack/title";
import Header from "./glob-pack/header";
import PaperCard from "./glob-pack/cards/paper";
export const GlobTitle = (props) => {
  return <Title {...props} />;
};
export const GlobHeader = (props) => <Header {...props} />;
export const GlobPaper = (props) => <PaperCard {...props} />;
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
