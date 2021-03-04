import { DataGrid } from "@material-ui/data-grid";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import Finder from "../components/objednavky/finder";
// import NewOrder from "../components/objednavky/new";
// import { ShowOrder } from "../components/objednavky/order";
//import { ShowOrders } from "../components/objednavky/show-orders";
import moment from "moment";
import { GlobHeader } from "../../../components/design/glob";
import PaperCard from "../../../components/design/glob-pack/cards/paper-card";
import axios from "axios";
import { Chip } from "@material-ui/core";
import { MUIDataTableLocaleCZ } from "../../../locale/locale-datagrid";
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
    return `${feedback}+${type}`;
    // return [feedback, type];
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
          deliveryDate: moment(order.PozDatumDodani).format("DD.MM.YYYY"),
          status: checkDate(order.PozDatumDodani),
        });
      });
      return setOrders(items);
    });
  };
  const columns = [
    {
      name: "id",
      label: "Číslo objednávky",
      width: 200,
      options: { filter: false },
    },
    {
      name: "deliveryPlace",
      label: "Místo doručení",
      width: 200,
    },
    { name: "orderedBy", label: "Objednal", width: 200 },
    {
      name: "deliveryDate",
      label: "Požad. čas doruč.",
      width: 200,
      options: {
        filter: false,
      },
    },
    {
      name: "status",
      label: "Status",
      width: 150,
      options: {
        filter: true,
        filterOptions: {
          renderValue: (v) => (v ? v.split("+")[0] : ""),
        },
        sortCompare: (order) => ({ data: first }, { data: second }) => {
          const firstItem = first.split("+")[0];
          const secondItem = second.split("+")[0];
          const items = [firstItem, secondItem];
          let returnNumber;
          if (firstItem === "V pořádku") {
            returnNumber = 10000;
          } else if (firstItem === "Poslední den" && secondItem !== "Pozdě") {
            returnNumber = 222;
          } else {
            returnNumber = 1000;
          }
          return order === "asc" ? returnNumber : returnNumber * -1;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          const values = value.split("+");
          if (value) return <Chip label={values[0]} className={values[1]} />;
        },
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    ...MUIDataTableLocaleCZ,
  };
  useEffect(() => {
    getOrders();
  }, []);

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
        {/* <PaperCard> */}
        <MUIDataTable
          options={options}
          data={orders}
          columns={columns}
          onRowClick={(e) => handleClick(e.row.id)}
        />
        {/* </PaperCard> */}
      </section>
      {/* </MDBNavLink> */}
    </React.Fragment>
  );
};
export default ShowOrders;
