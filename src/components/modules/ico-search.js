import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

export const IcoSearch = (props) => {

    const [ico, setIco] = useState();
    const [loading, setLoading] = useState(false);

    const search = () => {
        setLoading(true);

        const instance = axios.create({
            baseURL: "",
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })

        axios.get("https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_bas.cgi?ico=" + ico, instance)
        .then(res => {
            // console.log(res.data);
            const parser = new DOMParser();
            let doc;
            doc = parser.parseFromString(res.data, 'text/html');
            const x = doc.getElementsByTagName("D:VBAS");
            if(x[0] === undefined){
                return (
                    alert("IČO nebylo nalezeno"),
                    setLoading(false)
                )

            }
            //alert(x[0].getElementsByTagName("Identifikace").childNodes[0].nodeValue);

            const name = (x[0].getElementsByTagName("d:of")[0].childNodes[0].nodeValue);
            console.log(name);
            props.setData({name: name, ico: ico})
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <div className="mb-4" style={{ display: "flex", alignItems: "center"}}>
                <TextField onChange={e => setIco(e.target.value)} className="mr-3" variant="outlined" type="number" label="Zadejte IČO" size="small" />
                {loading ? <CircularProgress size={20} /> : <Button onClick={search}>Hledat podle IČO</Button>}
            </div>
        </React.Fragment>
    )
}