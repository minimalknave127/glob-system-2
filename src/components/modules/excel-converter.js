import React, { useState, useRef, useEffect } from "react";
import readXlsFile from "read-excel-file";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import PropTypes from "prop-types"

const Styles = styled.div`

    .import-wrapper{
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
    form > *{
        display: block;
        width: fit-content;
        margin: 1rem 0;
    }
    table{
        border-spacing: 1rem;
        border-collapse: separate;
        pointer-events: none;
    }
    td,th{
        padding: 1rem;
        min-width: 80px;
        border-size: 10px;
    }
    td{
        background-color: #ECEFF1;
        font-weight: 400;
    }
    th{
        font-weight: 600;
    }
    tbody tr:last-of-type{
        opacity: 0.3;
    }
    p{
        padding-left: calc(1rem + 10px);
        font-weight: 500;
        color: grey;
        font-size: 1.2rem;
    }
    .import-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;
const tableAlias = (input) => {
    switch (input[0]) {
        case "code": return "Kód";
        case "name": return "Popis";
        case "mj": return "MJ";
        case "amount": return "Množství";
        case "price": return "Jedn. cena";
        case "globalPrice": return "Celk. cena";
        default: return "Error";
    }
};
export const ExcelConverter = (props) => {

    const letterToNumber = (str) => {
        const localStr = str.toUpperCase();
        var out = 0, len = localStr.length;
        for (let pos = 0; pos < len; pos++) {
            out += (localStr.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out - 1;
    }
    let myArr = [];
    const fileRef = useRef();
    const [, setItems] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [positions, setPositions] = useState({
        firstRow: "",
        lastRow: "",
        fileName: "",
        code: "",
        name: "",
        mj: "",
        amount: "",
        price: "",
        globalPrice: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        // if (name === "lastRow" && parseInt(value) < positions.firstRow) return;
        if (name === "firstRow" && parseInt(value) > positions.lastRow) {
            setPositions({
                ...positions,
                lastRow: parseInt(value),
                [name]: parseInt(value)
            })
        }
        else if (!isNaN(value)) {
            setPositions({
                ...positions,
                [name]: parseInt(value)
            })
        } else {
            setPositions({
                ...positions,
                [name]: value
            })
        }

    }
    const handleImport = (e) => {
        e.preventDefault();
        const file = fileRef.current.files[0];
        console.log(file);

        readXlsFile(file).then((rows) => {
            let excelItems = [];
            for (let x = 0; x < rows.length; x++) {
                if (x >= positions.firstRow - 1 && x < positions.lastRow - 1) {
                    const currentRow = rows[x];
                    const object = {
                        code: currentRow[letterToNumber(positions.code)],
                        name: currentRow[letterToNumber(positions.name)],
                        mj: currentRow[letterToNumber(positions.mj)],
                        amount: currentRow[letterToNumber(positions.amount)],
                        price: currentRow[letterToNumber(positions.price)],
                        globalPrice: currentRow[letterToNumber(positions.globalPrice)]
                    }
                    if (object.code === null || object.amount === null) continue;
                    excelItems.push(object);
                }
            }
            console.log("length: " + excelItems.length);
            //set local data variables
            setItems(excelItems);
            //set global data variables
            props.setExcelItems(excelItems);
            props.onClose();
            console.log(excelItems);
        }).catch(err => {
            console.error(err);
            setOpenError(true);
        })
    }
    let tableRows = [];

    const drawRows = () => {
        const compare = (a, b) => {
            const aValue = Object.entries(a)[0][1];
            const bValue = Object.entries(b)[0][1];
            if (typeof aValue !== "string" || typeof bValue !== "string") return;

            const itemA = aValue.toUpperCase();
            const itemB = bValue.toUpperCase();

            let comparison = 0;
            if (itemA === "") {
                comparison = 1;
            } else if (itemB === "") {
                comparison = -1;
            }
            else if (itemA > itemB) {
                comparison = 1;
            } else if (itemA < itemB) {
                comparison = -1;
            }
            return comparison;
        }
        myArr = Object.keys(positions).map(i => { return { [i]: positions[i] } });
        myArr.concat(myArr.splice(0, 3));
        myArr.sort(compare);
        let numOfDrawRows = positions.lastRow - positions.firstRow + 1;
        if (numOfDrawRows > 3) numOfDrawRows = 3;

        for (let x = 0; x < numOfDrawRows; x++) {
            tableRows.push(
                <tr key={x}>
                    <th>{positions.firstRow === 0 ? positions.firstRow + x + 1 : x === numOfDrawRows - 1 && positions.lastRow ? positions.lastRow : positions.firstRow + x}</th>
                    {
                        myArr.map((item, index) => (
                            <td key={index + numOfDrawRows}>{tableAlias(Object.keys(item))}</td>
                        ))
                    }
                </tr>
            )
        }
        console.log("compared:");
        console.log(myArr);
        console.log(Object.values(myArr[0]));
        console.log(typeof tableRows[0]);
    }
    drawRows();

    useEffect(() => {
        drawRows();
    }, [positions]);

    return (
        <Styles>
            <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
                <Alert onClose={() => setOpenError(false)} severity="error">
                    Něco se nepovedlo. Soubor je pravděpodobně poškozený.
                </Alert>
            </Snackbar>
            <div className="import-wrapper">
                <form onSubmit={handleImport}>
                    <TextField variant="outlined" inputProps={{ min: 0 }} className="firstRow" type="number" name="firstRow" onChange={handleChange} label="Řádek s první položkou" size="small" />
                    <TextField variant="outlined" inputProps={{ min: 0 }} value={positions.lastRow} type="number" name="lastRow" onChange={handleChange} label="Řádek s poslední položkou" size="small" />
                    <TextField variant="outlined" type="text" name="code" onChange={handleChange} label="Sloupec s kódem" size="small" />
                    <TextField variant="outlined" type="text" name="name" onChange={handleChange} label="Sloupec s popisem" size="small" />
                    <TextField variant="outlined" type="text" name="mj" onChange={handleChange} label="Sloupec s MJ" size="small" />
                    <TextField variant="outlined" type="text" name="amount" onChange={handleChange} label="Sloupec s množstvím" size="small" />
                    <TextField variant="outlined" type="text" name="price" onChange={handleChange} label="Sloupec s cenou" size="small" />
                    <TextField variant="outlined" type="text" name="globalPrice" onChange={handleChange} label="Sloupec s celkovou cenou" size="small" />
                    <Button
                        style={{ backgroundColor: "#23A566", color: "#FFF" }}
                        variant="contained"
                        component="label"
                    >
                        Nahrát soubor Excelu
                    <input
                            ref={fileRef}
                            type="file"
                            hidden
                            onChange={(e) => setPositions({ ...positions, fileName: e.target.files[0].name })}
                        />
                    </Button>
                    <Button type="submit">Importovat</Button>
                </form>
                <div className="import-info">
                    <p>Řádek s první položkou: <span style={{ color: 'black' }}>{positions.firstRow}</span> </p>
                    <p>Řádek s poslední položkou: <span style={{ color: 'black' }}>{positions.lastRow}</span> </p>
                    <p>Počet položek: <span style={{ color: 'black' }}>{positions.lastRow - positions.firstRow}</span> </p>
                    {positions.fileName ? <p>Název souboru: <span style={{ color: 'black' }}>{positions.fileName.length > 35 ? (positions.fileName.substr(0, 35) + "...") : positions.fileName}</span> </p> : null}
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {myArr.map((item, index) => (
                                    <th key={index}>{typeof Object.values(myArr[index])[0] === "string" ? Object.values(myArr[index])[0].toUpperCase() : null}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <th>{positions.firstRow === 0 ? positions.firstRow + index + 1 : positions.firstRow + index}</th>
                                {
                                    myArr.map((item, index) => (
                                        <td>{tableAlias(Object.keys(myArr[0]))}</td>
                                    ))
                                }
                            </tr> */}
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </Styles>
    )
}
ExcelConverter.propTypes = {
    setExcelItems: PropTypes.func,
    onClose: PropTypes.func
}