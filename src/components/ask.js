import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import PropTypes from "prop-types";

export const AskAlert = (props) => {

    const accept = () => {
        props.onAccept();
        //setOpen(false)
    }
    const decline = () => {
        props.onDecline(false);
    }

    return(
        <React.Fragment>
            <Dialog
                open={props.open}
                //onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Provedení změny nelze zvrátit.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={decline} color="primary">
                        Ne
                    </Button>
                    <Button onClick={accept} color="primary" autoFocus>
                        Ano
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
AskAlert.propTypes = {
    onAccept: PropTypes.func,
    title: PropTypes.string,
    onDecline: PropTypes.func,
    open: PropTypes.bool
}