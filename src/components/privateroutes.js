import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { userData } from "./userData";
import CircularProgress from "@material-ui/core/CircularProgress";
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, loaded } = useContext(userData);
  //const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <CircularProgress />;
  }
  if (loaded) {
    if (auth) {
      return <Route {...rest} render={(props) => <Component />} />;
    } else {
      return (
        <Route
          {...rest}
          render={(props) => (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )}
        />
      );
    }
  }
  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) =>
  //         auth ? (
  //           <Component {...props} />
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/login",
  //               state: {
  //                 from: props.location,
  //               },
  //             }}
  //           />
  //         )
  //       }
  //     />
  //   );
};
