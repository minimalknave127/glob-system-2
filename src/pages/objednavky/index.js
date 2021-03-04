/* eslint-disable array-callback-return */
import React from "react";
import Finder from "./components/finder";
import NewOrder from "./components/new";
import { ShowOrder } from "./components/order";
import ShowOrders from "./components/show-orders";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Objednavky = () => {
  const { path } = useRouteMatch();
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path} component={ShowOrders} />
        <Route path={`${path}/:id`} component={ShowOrder} />
        <Route path={`${path}/novy`} component={NewOrder} />
      </Switch>
    </React.Fragment>
  );
};
export default Objednavky;
