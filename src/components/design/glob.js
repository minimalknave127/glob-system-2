import React from "react";
import PropTypes from "prop-types";
import { Title } from "./glob-pack/title";
import Header from "./glob-pack/header";
import Paper from "./glob-pack/cards/paper";
import PaperCard from "./glob-pack/cards/paper-card";
export const GlobTitle = (props) => {
  return <Title {...props} />;
};
export const GlobHeader = (props) => <Header {...props} />;
export const GlobPaper = (props) => <Paper {...props} />;
export const GlobPaperCard = (props) => <PaperCard {...props} />;
GlobTitle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
};
GlobHeader.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  desc: PropTypes.string,
  createButton: PropTypes.bool,
  createButtonLabel: PropTypes.string,
  onCreateButtonClick: PropTypes.func,
};
GlobPaperCard.propTypes = {
  title: PropTypes.string,
};
