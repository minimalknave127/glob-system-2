import React, { Fragment } from "react";
import { GlobHeader } from "../../components/design/glob";
import MUIDataTable from "mui-datatables";
import { MUIDataTableLocaleCZ } from "../../locale/locale-datagrid";
import { Button, makeStyles } from "@material-ui/core";
import MediaCard from "./components/project-card";
import { withRouter } from "react-router-dom";

//DataTable options
const options = {
  ...MUIDataTableLocaleCZ,
};

const useStyles = makeStyles((theme) => ({
  headerButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  projects: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(5),
  },
  projectCard: {
    margin: theme.spacing(1),
    boxShadow:
      "rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px",
  },
}));

const ShowProjects = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <GlobHeader
        title="Projekty - přehled"
        desc="Přehled stavebních projektů"
        createButton
        createButtonLabel="Nový projekt"
        onCreateButtonClick={() => props.history.push("/projekty/novy")}
      />
      <section className={classes.projects}>
        <MediaCard
          className={classes.projectCard}
          title="Apartmány Filipovice"
          desc="Založeno: 10.12.2020"
          image={require("../../media/fotky/IMG_4325.jpg").default}
        />
        <MediaCard
          className={classes.projectCard}
          title="Apartmány Filipovice"
          desc="Založeno: 10.12.2020"
          image={require("../../media/fotky/IMG_4325.jpg").default}
        />
        <MediaCard
          className={classes.projectCard}
          title="Apartmány Filipovice"
          desc="Založeno: 10.12.2020"
          image={require("../../media/fotky/IMG_4325.jpg").default}
        />
      </section>
    </Fragment>
  );
};
export default withRouter(ShowProjects);
