import { Container } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "./nav";

const LayOut = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <NavBar {...props} />
        </div>
        <div
          className="p-5"
          style={{
            width: "calc(100%)",
          }}
        >
          <Container maxWidth="xl" className="mt-5 pt-3">
            {props.children}
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(LayOut);
