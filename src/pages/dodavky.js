import React from "react";
import { Link } from "react-router-dom";

import { MaterialyTable } from "../components/modules/material-table";

export const Dodavky = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const action = url.searchParams.get("action") || null;
  console.log(action);

  if (action === "all") {
    return <MaterialyTable />;
  }
  return (
    <React.Fragment>
      <h1>Dodávky</h1>

      {/* <Link to="/dodavky?action=all"><MDBBtn>Všechny dodávky</MDBBtn></Link> */}
    </React.Fragment>
  );
};
