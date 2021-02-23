// import { MDBDataTableV5 } from "mdbreact";
// import React, { useState } from "react";

// export const MaterialyTable = () => {

//     const [data, setData] = useState({
//         columns:[
//             {
//                 label: "Kód",
//                 field: "kod",
//             },
//             {
//                 label: "Název",
//                 field: "nazev",
//             },
//             {
//                 label: "Umístění",
//                 field: "umisteni"
//             },
//             {
//                 label: "Počet",
//                 field: "pocet"
//             },
//             {
//                 label: "Jednotka",
//                 field: "jednotka"
//             },
//             {
//                 label: "Poslední aktivita",
//                 field: "posledniAktivita"
//             }
//         ],
//         rows: [
//             {
//                 kod: "TXZ6787",
//                 nazev: "Testovací položka",
//                 umisteni: "Holešovice"

//             },
//             {
//                 kod: "TXZ6717",
//                 nazev: "Testovací položka",
//                 umisteni: "Holešovice"

//             },
//             {
//                 kod: "TXZ6767",
//                 nazev: "Testovací položka",
//                 umisteni: "Stodůlky"

//             }
//         ]
//     })
//     const [checked, setChecked] = useState([]);

//     const setCheckboxes = (data, multiple) => {
//         let newData = [];
//         if(typeof data === "object"){
//             if(multiple === true){
//                 if(data[0].checked){
//                     setChecked(data);
//                 }else{
//                     setChecked([]);
//                 }
//             }else{
//                 if(checked.length < 1){
//                     setChecked(checked => [...checked, data]);
//                 }else{
//                     if(checked.filter(item => item.kod === data.kod).length > 0){
//                         let newChecked = checked.filter(item => item.kod !== data.kod);
//                         console.log(newChecked);
//                         setChecked(newChecked);
//                     }else{
//                         setChecked(checked => [...checked, data]);
//                     }
//                 }
//                 const arr = [];
//                 // if (checked.filter(e => e.kod === data.kod).length > 0){
//                 //     setChecked(checked.filter(e => e.kod === data.kod));
//                 // }else{
//                 //     checked.push(data);
//                 // }
//                 // console.log(checked.filter(e => e.kod === data.kod).length > 0);
//             }
//         }
//         // console.log(Object.values(data));
//     }

//     return(
//         <React.Fragment>
//             <h1>Databáze dodávek</h1>

//             <MDBDataTableV5 data={data}
//             entriesLabel="Počet položek na stránku"
//             checkbox
//             bodyCheckboxID="id1"
//             proCheckboxes
//             multipleCheckboxes
//             getValueCheckBox={value => setCheckboxes(value, false)}
//                 getValueAllCheckBoxes={value => setCheckboxes(value, true) }
//             noRecordsFoundLabel="Nic nebylo nalezeno."
//             searchLabel="Hledat..."
//             entrieslabel="Počet položek na stránku"
//             displayEntries={true}
//             infoLabel={["", "-", "ze", "položek"]}
//             />

//         </React.Fragment>
//     )
// }
