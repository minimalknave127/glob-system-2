import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const OrderItems = (props) => {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root + " mt-4"} aria-label="items">
            {props.children}
        </List>
    );
}
export const OrderItem = (props) => {
    return (
        <ListItem style={{
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 0.4375rem 1.813rem 0px"
        }} button>
            {/* <ListItemIcon>
                <b>10x</b>
            </ListItemIcon>
            <ListItemText inset primary={props.text} /> */}
            <ListItemText>
                {props.text}
            </ListItemText>
        </ListItem>
    )
}