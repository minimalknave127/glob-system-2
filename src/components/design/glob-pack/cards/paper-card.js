import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    boxShadow:
      "rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px",
    minWidth: "200px",
    borderRadius: "10px",
  },
  cardTitle: {
    color: theme.palette.grey[800],
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(16),
    margin: theme.spacing(1.5),
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
const PaperCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.cardHeader}>
          <Typography variant="h6" className={classes.cardTitle}>
            {props.title}
          </Typography>
        </div>
        <div>{props.children}</div>
      </CardContent>
    </Card>
  );
};
export default PaperCard;
