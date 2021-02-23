import React, { Fragment } from "react";
import { getUrl } from "../functions/global-functions";
import { NavLink } from "react-router-dom";
import { Fab } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// new 
import { NewTender } from "../components/tender/new-tender"

import { GlobTitle } from "../components/design/glob";

export const Tender = () => {

    const url = getUrl(window.location.href);
    switch (url.get("action")) {
        case "new": return <NewTender />
        case "showTender": return <h1>Show tender</h1>
    }

    return (
        <Fragment>
            <GlobTitle title="Tender" icon={require("../assets/icons/email.svg")} />
            <NavLink to="?action=new">
                <Fab variant="extended" color="primary" aria-label="New order">
                    <AddCircleOutlineIcon className="mr-2" />
                Nový tender
                </Fab>
            </NavLink>
        </Fragment>
    )
}