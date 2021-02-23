import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import Finder from "../components/objednavky/finder";
// import NewOrder from "../components/objednavky/new";
// import { ShowOrder } from "../components/objednavky/order";
//import { ShowOrders } from "../components/objednavky/show-orders";
import moment from "moment";
import { GlobHeader } from "../design/glob";
import PaperCard from "../design/glob-pack/cards/paper-card";
import axios from "axios";
import { Chip } from "@material-ui/core";
const { REACT_APP_BACKEND_URL } = process.env;

const useStyles = makeStyles((theme) => ({
  table: {
    height: 500,
    border: "none",
  },
  successChip: {
    backgroundColor: theme.palette.success.light,
    color: "#FFF",
  },
  dangerChip: {
    backgroundColor: theme.palette.error.light,
    color: "#FFF",
  },
  warningChip: {
    backgroundColor: theme.palette.warning.light,
    color: "#FFF",
  },
}));
const ShowOrders = () => {
  const classes = useStyles();
  const urlString = window.location.href;
  const url = new URL(urlString);
  const action = url.searchParams.get("action");
  const [orders, setOrders] = useState([]);
  const [, setLoading] = useState(false);
  let history = useHistory();

  // eslint-disable-next-line default-case
  //   switch (action) {
  //     case "new":
  //       return <NewOrder />;
  //     case "showOrder":
  //       return <ShowOrder />;
  //     case "finder":
  //       return <Finder />;
  //   }
  const handleClick = (id) => {
    history.push("/objednavky/" + id);
  };
  const checkDate = (date) => {
    let type, feedback;
    if (moment().isAfter(date, "day")) {
      feedback = "Pozdě";
      type = classes.dangerChip;
    } else if (moment().isSame(date, "day")) {
      feedback = "Poslední den";
      type = classes.warningChip;
    } else {
      feedback = "V pořádku";
      type = classes.successChip;
    }
    return [feedback, type];
  };
  const getOrders = () => {
    const url = REACT_APP_BACKEND_URL + "api/orders";
    axios.get(url).then((res) => {
      const resOrders = res.data?.data;
      const items = [];
      resOrders.map((order) => {
        items.push({
          id: order.ObjednavkaID,
          deliveryPlace: order.SkladJmeno,
          orderedBy: order.Jmeno + " " + order.Prijmeni,
          deliveryDate: order.PozDatumDodani,
          status: checkDate(order.PozDatumDodani),
        });
      });
      return setOrders(items);
    });
  };
  const columns = [
    { field: "id", headerName: "Číslo objednávky", width: 200 },
    {
      field: "deliveryPlace",
      headerName: "Místo doručení",
      width: 200,
    },
    { field: "orderedBy", headerName: "Objednal", width: 200 },
    {
      field: "deliveryDate",
      headerName: "Požad. čas doruč.",
      width: 400,
    },
    {
      field: "status",
      headerName: "Status",
      width: 400,
      renderCell: (params) => {
        if (params)
          return <Chip label={params.value[0]} className={params.value[1]} />;
      },
    },
  ];
  useEffect(() => {
    getOrders();
  }, []);
  // if all orders - fetch data

  //   const rows = [
  //     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //     { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //     { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //     { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //   ];

  // if (action == "new") {
  //     return <NewOrder />
  // } else if (action == "showOrder") {
  //     return <ShowOrder />
  // }

  return (
    <React.Fragment>
      {/* <MDBNavLink className="p-0 text-white" to="/objednavky?action=new"> */}
      {action === "archive" ? (
        <GlobHeader title="Objednávky - archiv" />
      ) : (
        <React.Fragment>
          <GlobHeader title="Objednávky" desc="Objednávky na stavbu" />
        </React.Fragment>
      )}
      <section className="mt-5">
        {/* {action === "archive" ? <ShowOrders archive /> : <ShowOrders />} */}
        <PaperCard title="Objednávky">
          <DataGrid
            autoHeight
            className={classes.table}
            rows={orders}
            columns={columns}
            disableColumnMenu
            pageSize={10}
            rowsPerPageOptions={[]}
            disableSelectionOnClick
            onRowClick={(e) => handleClick(e.row.id)}
          />
        </PaperCard>
      </section>
      {/* </MDBNavLink> */}
    </React.Fragment>
  );
};
export default ShowOrders;
