import React, { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ShowTenders from "./show-tenders";

// new
import NewTender from "./new-tender";

export const Tender = () => {
  const { path, url } = useRouteMatch();
  return (
    <Fragment>
      <Switch>
        <Route exact path={path} component={ShowTenders} />
        <Route path={path + "/novy"} component={NewTender} />
      </Switch>
    </Fragment>
  );
};
