import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userData } from "./userData";

export const PrivateRoute = ({ component: Component, ...rest }) => {

    const user = useContext(userData); 

  return <Route 
    {...rest} render={props => 
        user.loggedIn ? (
            <Component {...props} />
        )
        :
        (
            <Redirect to={{
                pathname: "/login",
                state: {
                    from: props.location
                }
            }} />
        )
    }
   
   />
}