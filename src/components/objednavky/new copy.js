import React, { useState } from "react";
import { GlobCard, GlobCardSection } from "../design/card";

import { Table } from "../objednavky/table";

import { IcoSearch } from "../modules/ico-search";

import Button from "@material-ui/core/Button"
import AsyncComplete from "../modules/async-autocomplete";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import * as backendData from "../../backend/config.json";

import axios from "axios";

import { AskAlert } from "../ask";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(1),
        maxWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const NewOrder = (props) => {

    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    const [formData, setFormData] = useState({
        ico: "",
        storage: undefined,
        supplierName: "",
        transportation: ""
    });
    const ordersUpdate = (data) => {
        setOrders(data);
    }

    const storages = [
        {
            text: "Stodůlky",
            value: 1
        },
        {
            text: "Holešovice",
            value: 2
        },
        {
            text: "Písnice",
            value: 3
        },
        {
            text: "Novodvorská (stavba)",
            value: 4
        },
    ];
    const setSupplier = (e) => {
        setFormData({
            ...formData,
            supplierName: e.name,
            ico: e.ico
        })
    }

    const suppliers = [
        "Dek",
        "Fortel",
        "Hornbach",
        "Baushop"
    ]
    const handleAccept = () => {
        //alert("Vytvořeno!");
        //setModalOpen(false);

        //FAKE ACCEPT

        props.history.push("/objednavky?orderId=test");



        // PREPARED - FOR NOW USING FAKE //
        //const url = backendData.backend_url + "/create-order.php";

        // let data = new FormData();
        // data.append("supplierICO", formData.ico);
        // data.append("supplierName", formData.supplierName);
        // data.append("transportation", formData.transportation);
        // data.append("storage", formData.storage);

        // orders.map(order => {
        //     data.append("orders[]", order);
        // })
        // axios.post(url, data)
        // .then(res => {
        //     console.log(res);
            
        // })
        // .catch(err => {
        //     console.log(err);
        // })


    }

    return (
        <div>
            <GlobCard name="Nová objednávka">
                <AskAlert onDecline={() => setModalOpen(false)} onAccept={handleAccept} title="Opravdu chcete vytvořit objednávku?" open={modalOpen} />
                <div>
                    <GlobCardSection name="Základní informace">
                       <IcoSearch setData={e => setSupplier(e)} />
                        <form style={{display: "flex", flexDirection: "column"}} autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <TextField type="text" label="Název dodavatele" value={formData.supplierName} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-labell">Na sklad / stavbu</InputLabel>
                                <Select className="mt-3"
                                    id="storage"
                                    onChange={e => setFormData({
                                        ...formData,
                                        storage: e.target.value
                                    })}
                                    value={formData.storage}
                                    label="Umístění"
                                    labelId="demo-simple-select-labell"
                                >
                                    {storages.map((stor, i) => {
                                        return <MenuItem key={i} value={stor.value}>{stor.text}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Způsob dopravy</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    onChange={e => setFormData({
                                        ...formData,
                                        transportation: e.target.value
                                    })}
                                    value={formData.transportation}
                                >
                                    <MenuItem value="vlastni">Vlastní</MenuItem>
                                    <MenuItem value="dopravce">Od dopravce</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                        {/* <MDBInput type="number" label="zadejte IČO dodavatele" /> */}
                    </GlobCardSection>

                    <GlobCardSection name="Materiály">
                        <Table setOrders={(data) => ordersUpdate(data)} />
                    </GlobCardSection>

                    <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                        <Button color="primary" onClick={() => setModalOpen(true)} >Uložit objednávku</Button>
                    </div>

                </div>
            </GlobCard>
        </div>
    );
}
export default withRouter(NewOrder);