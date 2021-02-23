import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@material-ui/core";
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
    marginBottom: theme.spacing(1.5),
  },
  cardContextMain: {
    fontSize: theme.typography.pxToRem(24),
    marginBottom: theme.spacing(2),
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardFooter: {
    color: theme.palette.grey[800],
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(14),
  },
  chipError: {
    backgroundColor: "#e6a8a863",
    color: theme.palette.error.main,
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1.2),
    fontWeight: 500,
    borderRadius: 8,
  },
}));
const SmallCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.cardHeader}>
          <Typography variant="h6" className={classes.cardTitle}>
            Dnešní prodej
          </Typography>
          <Chip size="small" color="primary" label="Novinky" />
        </div>
        <Typography variant="h4" className={classes.cardContextMain}>
          2.532
        </Typography>
        <Typography variant="h6" className={classes.cardFooter}>
          <span className={classes.chipError}>-25%</span>Od posledního týdne
        </Typography>
      </CardContent>
    </Card>
  );
};
export default SmallCard;
