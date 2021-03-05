import React, { Fragment } from "react";
import {
  Typography,
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  Button,
} from "@material-ui/core";

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: "1.5rem",
  fontWeigth: "600",
};
theme.typography.h6 = {};
const useStyles = makeStyles((theme) => ({
  mainTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  secondTitle: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(16),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  headerButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));
const Header = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Typography className={classes.mainTitle} variant="h3">
          {props.title}
        </Typography>
        <Typography className={classes.secondTitle} variant="h6">
          {props.desc}
        </Typography>
      </ThemeProvider>
      <hr className={classes.divider} />
      {props.createButton ? (
        <div className={classes.headerButton}>
          <Button
            color="primary"
            variant="contained"
            onClick={props.onCreateButtonClick}
          >
            {props.createButtonLabel ?? "Nový"}
          </Button>
        </div>
      ) : null}
    </Fragment>
  );
};
export default Header;
