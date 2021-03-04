import React from "react";
// import Finder from "./objednavky/finder";
// import NewOrder from "../components/objednavky/new";
// import { ShowOrder } from "../components/objednavky/order";
import ShowProjects from "./show-projects";
import NewProject from "./new-project";
import ShowProject from "./show-project";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Projekty = () => {
  const { path, url } = useRouteMatch();
  // eslint-disable-next-line default-case
  // switch (end) {
  //   case "new":
  //     return <NewOrder />;
  //   case "projekty":
  //     return <ShowProjects />;
  //   case "finder":
  //     return <Finder />;
  //   default:
  //     return <ShowOrder />;
  // }
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path} component={ShowProjects} />
        <Route path={path + "/novy"} component={NewProject} />
        <Route path={path + "/:id"} component={ShowProject} />
      </Switch>
    </React.Fragment>
  );
};
export default Projekty;
