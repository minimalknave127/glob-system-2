import MomentUtils from '@date-io/moment';
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import moment from "moment";
import "moment/locale/cs";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as backendData from "../../backend/config.json";
import { AskAlert } from "../ask";
import { GlobCard, GlobCardSection } from "../design/card";
import { IcoSearch } from "../modules/ico-search";
import { Table } from "../objednavky/table";

moment.locale("cs");


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
    const [active, setActive] = useState(true);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [formData, setFormData] = useState({
        ico: "",
        storage: '',
        supplierName: "",
        transportation: ""
    });
    const ordersUpdate = (data) => {
        setOrders(data);
    }

    const [urs, setUrs] = useState([]);
    const [storages, setStorages] = useState([]);
    const setSupplier = (e) => {
        setFormData({
            ...formData,
            supplierName: e.name,
            ico: e.ico
        })
    }
    const handleAccept = () => {
        //alert("Vytvořeno!");
        //setModalOpen(false);

        //FAKE ACCEPT



        // PREPARED - FOR NOW USING FAKE //
        const url = backendData.backend_url + "objednavky-zapis.php";
        const orderId = Math.floor(Date.now() + Math.random());
        console.log(orderId);

        let data = new FormData();
        data.append("ICODodavatele", formData.ico);
        //data.append("supplierName", formData.supplierName);
        data.append("doprava", formData.transportation);
        data.append("skladID", formData.storage);
        data.append("objednavkaID", orderId);
        data.append("idUzivatele", 1);
        data.append("pozDatumDodani", moment(selectedDate).format());


        data.append("materialy", JSON.stringify(orders));
        axios.post(url, data)
            .then(res => {
                if (res.data == "success") {
                    props.history.push("/objednavky?action=showOrder&orderId=" + orderId);
                }
                console.log(res.data);

            })
            .catch(err => {
                console.log(err);
            })


    }

    useEffect(() => {
        if (storages.length === 0) {
            const url = backendData.backend_url + "ObjednakvyVypis.php";
            (async () => {
                const response = await fetch(url);
                const data = await response.json().then(console.log(data));
                console.log(data);
                const stor = [];
                data.sklady.map(sklad => {
                    console.log(sklad.SkladID);
                    console.log(sklad.SkladJmeno);
                    stor.push({
                        text: sklad.SkladJmeno,
                        value: parseInt(sklad.SkladID)
                    });
                });
                setStorages(stor);
                setUrs(data.urs);

                //     .catch(err => {
                //     console.error(err);
                // })
            })();
        }
    })

    return (
        <div>
            <GlobCard name="Nová objednávka">
                <AskAlert onDecline={() => setModalOpen(false)} onAccept={handleAccept} title="Opravdu chcete vytvořit objednávku?" open={modalOpen} />
                <div>
                    <GlobCardSection name="Základní informace">
                        <IcoSearch setData={e => setSupplier(e)} />
                        <form style={{ display: "flex", flexDirection: "column" }} autoComplete="off">
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
                                    {storages.map((stor, i) => (
                                        <MenuItem key={i} value={stor.value}>{stor.text}</MenuItem>
                                    ))}
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
                                    <MenuItem value="dodavatel">Od dodavatele</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl} style={{ marginTop: 16 }}>
                                <MuiPickersUtilsProvider
                                    libInstance={moment}
                                    locale={moment.locale("cs")}
                                    utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        invalidDateMessage="Nesprávný formát data"
                                        minDateMessage="Datum by nemělo být menší než dnešní"
                                        disablePast
                                        clearLabel="vymazat"
                                        cancelLabel="zpět"
                                        okLabel="potvrdit"
                                        clearable
                                        value={selectedDate}
                                        placeholder="Požadované datum dodání"
                                        onChange={date => handleDateChange(date)}
                                        format="DD.MM.YYYY"
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                        </form>
                        {/* <MDBInput type="number" label="zadejte IČO dodavatele" /> */}
                    </GlobCardSection>

                    <GlobCardSection name="Materiály">
                        <Table urs={urs} setOrders={(data) => ordersUpdate(data)} />
                    </GlobCardSection>

                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <Button color="primary" onClick={() => setModalOpen(true)} >Uložit objednávku</Button>
                    </div>

                </div>
            </GlobCard>
        </div >
    );
}
export default withRouter(NewOrder);