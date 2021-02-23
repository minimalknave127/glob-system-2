import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme, useMediaQuery, Slide } from "@material-ui/core";
import PropTypes from "prop-types";
import { checkObjectForNull } from "../../functions/global-functions";

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />
})

export const AddItem = (props) => {

    const [itemInfo, setItemInfo] = useState({});
    const [newItem, setNewItem] = useState({
        name: "",
        materialId: 0,
        unit: "",
        amount: 0,
        price: 0,
        id: 0,
        index: itemInfo.index
    })
    const [disabled, setDisabled] = useState(true);

    const screen = useMediaQuery(useTheme().breakpoints.down("xs"));

    const handleClose = () => {
        props.onClose();
    }
    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewItem({
            ...newItem,
            [id]: value
        });

    }
    const handleSubmit = () => {
        props.onSubmit(newItem);
    }
    useEffect(() => {
        setItemInfo(props.itemInfo);
        setNewItem({ ...newItem, index: props.itemInfo.index });
    }, [props.itemInfo]);
    useEffect(() => {
        if (!checkObjectForNull(newItem)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newItem]);
    return (
        <Dialog
            fullScreen={screen}
            open={props.open}

            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            TransitionComponent={Transition}
        >
            <DialogTitle id="responsive-dialog-title">{"Přidat položku"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {itemInfo.name}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Název položky"
                    name="item name"
                    type="email"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Cenav KČ"
                    type="number"
                    name="item price"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Množství"
                    type="number"
                    name="item amount"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="unit"
                    label="Jednotka"
                    type="text"
                    name="item unit"
                    fullWidth
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Zrušit
                </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus disabled={disabled}>
                    Přidat
          </Button>
            </DialogActions>
        </Dialog>
    )
}

AddItem.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    onSubmit: PropTypes.func
}