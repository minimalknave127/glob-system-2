/* eslint-disable array-callback-return */
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Finder from "../components/objednavky/finder";
import NewOrder from "../components/objednavky/new";
import { ShowOrder } from "../components/objednavky/order";
import moment from "moment";
import { GlobHeader } from "../components/design/glob";
import PaperCard from "../components/design/glob-pack/cards/paper-card";
import axios from "axios";
import { Chip } from "@material-ui/core";
import ShowOrders from "../components/objednavky/show-orders";

const Objednavky = () => {
  const urlString = window.location.pathname.split("/");
  const end = urlString[urlString.length - 1];

  // eslint-disable-next-line default-case
  switch (end) {
    case "new":
      return <NewOrder />;
    case "objednavky":
      return <ShowOrders />;
    case "finder":
      return <Finder />;
    default:
      return <ShowOrder />;
  }
  return (
    <React.Fragment>
      <ShowOrders />
    </React.Fragment>
  );
};
export default Objednavky;
