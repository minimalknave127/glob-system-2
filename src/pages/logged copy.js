import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const Logged = (props) => {

    const [isLogged, setLog] = useState(true);

    const logout = () => {
        localStorage.removeItem("authToken");
        setLog(false);
    }

    return (
        <React.Fragment>
            {!isLogged ? <Redirect to={{
                pathname: "/login",
                from: props.location
            }} /> : null}
            <h1>You are logged in!</h1>
            <p>But you can still log out if u want!</p>
            <button onClick={logout}>Log out</button>
        </React.Fragment>
    )
}