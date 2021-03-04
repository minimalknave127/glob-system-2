import React, { useState, useEffect } from "react";
import { GlobCardSection } from "../../../components/design/card";
import { DataGrid } from "@material-ui/data-grid";
import { LocaleText } from "../../../locale/locale-datagrid";

const columns = [
  { field: "ico", headerName: "IČO", width: 80 },
  { field: "name", headerName: "Název dodavatele", width: 200 },
];
export const TenderSecondStep = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const setSuppliers = (array) => {
    const supp = array;
    const filtered = [];
    for (let x = 0; x < supp.length; x++) {
      filtered.push(items[parseInt(supp[x])]);
    }
    setSelectedSuppliers(filtered);
    props.setSuppliers(filtered);
  };

  useEffect(() => {
    setTimeout(() => {
      setItems([
        { id: 0, ico: "08365521", name: "GLOB Alu steel" },
        { id: 1, ico: "27653021", name: "GLOB Production" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <GlobCardSection name="Zadejte dodavatele">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={items}
          columns={columns}
          pageSize={5}
          checkboxSelection
          localeText={LocaleText}
          disableColumnFilter
          onSelectionChange={(e) => setSuppliers(e.rowIds)}
        />
      </div>
    </GlobCardSection>
  );
};
