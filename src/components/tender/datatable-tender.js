import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { LocaleText } from "../../locale/locale-datagrid";

const columns = [
    { field: 'ico', headerName: 'IČO', width: 130 },
    { field: 'name', headerName: 'Název', width: 130 },
];

const rows = [
    { id: 1, ico: '27653021', name: 'GLOB Production, s.r.o.' },
    { id: 2, ico: '08365521', name: 'GLOB Alu Steel, s.r.o.' },
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

// const () {
//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid loading={false} rows={rows} columns={columns} pageSize={5} checkboxSelection localeText={LocaleText} disableColumnFilter onSelectionChange={(e) => console.log(e.rowIds)} />
//         </div>
//     );
// }
