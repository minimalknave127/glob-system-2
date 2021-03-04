import React from "react";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow:
      "rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px",
    padding: theme.spacing(2),
  },
}));

const PaperCard = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper + " " + props.className}>
      {props.children}
    </Paper>
  );
};
export default PaperCard;
