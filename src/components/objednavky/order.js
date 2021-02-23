// material UI
//
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as backendData from "../../backend/config.json";
import { AskAlert } from "../ask";
import { GlobCard, GlobCardSection } from "../design/card";
import { OrderItem, OrderItems } from "./orderitem";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export const ShowOrder = () => {
  //Getting URL PARAMS (ORDER ID)
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const [status, setStatus] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [orderData, setOrderData] = useState({
    supplierIco: null,
    supplierName: "Respo, s.r.o.",
    deliveryDate: "",
    storageId: null,
    orderingUserId: null,
    deliveryType: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  // Move order to archive
  const handleDelete = () => {
    const url = backendData.backend_url + "archive-order.php";
    let formData = new FormData();
    formData.append("orderid", orderId);
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          setOpenModal2(false);
          setOpenSnack(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // Accept the order and move materials to the system
  const handleAccept = () => {
    const url = backendData.backend_url + "api/orders/" + orderId;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getOrder = () => {
    const url = backendData.backend_url + "api/orders/" + orderId;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        const orderItems = res.data.order.orderItems;
        const info = res.data.order.orderInfo;

        setOrderData({
          supplierIco: info.ICODodavatele,
          deliveryDate: info.PozDatumDodani,
          storageId: parseInt(info.SkladID),
          deliveryType: info.Doprava,
          archive: parseInt(info.archiv),
        });

        setOrderItems(orderItems);
      })
      .catch((err) => {
        console.log(err);
      });
    setStatus(true);
  };
  const checkDate = () => {
    const date = orderData.deliveryDate;
    if (orderData.archive) {
      setDeadline("archive");
    } else if (moment().isAfter(date, "day")) {
      console.log("Po termínu");
      setDeadline("after");
    } else if (moment().isSame(date, "day")) {
      setDeadline("today");
      console.log("Dnes");
    } else {
      setDeadline("before");
      console.log("Před termínem");
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    if (orderData.deliveryDate !== "" && deadline === "") {
      checkDate();
    }
  }, [orderData]);
  if (!status) {
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <AskAlert
        open={openModal}
        onDecline={() => setOpenModal(false)}
        onAccept={() => {
          handleAccept();
          setOpenModal(false);
        }}
        title="Opravdu chcete přijmout objednávku?"
      />
      <AskAlert
        open={openModal2}
        onDecline={() => setOpenModal2(false)}
        onAccept={() => handleDelete()}
        title="Opravdu chcete odstranit objednávku?"
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert severity="success">Objednávka byla přesunuta do archivu</Alert>
      </Snackbar>
      <GlobCard name={`Přehled objednávky`}>
        {deadline !== "before" ? (
          <div className="mb-4">
            {deadline === "archive" ? (
              <Alert severity="warning">
                <AlertTitle>Objednávka je v archivu</AlertTitle>
                Objednávka je archivována a nelze jí přijmout.
              </Alert>
            ) : deadline === "after" ? (
              <Alert severity="error">
                Objednávka má zpoždění{" "}
                <b>{moment().diff(orderData.deliveryDate, "day") + 1} dní</b>.
              </Alert>
            ) : deadline === "today" ? (
              <Alert severity="warning">Objednávka má přijít dnes.</Alert>
            ) : null}
          </div>
        ) : null}
        <section className="orderInfo">
          <h6>
            Číslo objednávky: <strong>{orderId}</strong>
          </h6>{" "}
          <br />
          <h6>
            Dodavatel: <strong>{orderData.supplierName}</strong>
          </h6>{" "}
          <br />
          <h6>
            Objednal uživatel:{" "}
            <strong>
              <a>Petr Simandl</a>
            </strong>
          </h6>{" "}
          <br />
          <h6>
            Doprava:{" "}
            <strong>
              <a>{orderData.deliveryType}</a>
            </strong>
          </h6>{" "}
          <br />
          <h6>
            Číslo skladu: <strong>{orderData.storageId}</strong>
          </h6>{" "}
          <br />
          <h6>
            Předp. datum dodání:{" "}
            <strong>
              <a>{moment(orderData.deliveryDate).format("DD.MM.YYYY")}</a>
            </strong>
          </h6>{" "}
          <br />
          <Typography>
            <Link
              href={
                backendData.backend_url +
                "soubory/objednavky/objednavka-" +
                orderId +
                ".pdf"
              }
              rel="noreferrer"
              target="_blank"
            >
              Zobrazit objednávku
            </Link>
          </Typography>
          <hr />
        </section>
        <section>
          <h5>
            <b>Položky</b>
          </h5>
          <div className="orderItems">
            <OrderItems>
              {orderItems.map((item, index) => {
                return <OrderItem key={index} text={item.Nazev} />;
              })}
            </OrderItems>
          </div>
        </section>
        <GlobCardSection>
          {orderData.archive ? (
            //order is archived
            <div style={{ float: "right" }}>
              <Button>Obnovit objednávku</Button>
            </div>
          ) : (
            //order is active
            <div style={{ float: "right" }}>
              <Button color="secondary" onClick={() => setOpenModal2(true)}>
                Odstranit
              </Button>
              <Button onClick={() => setOpenModal(true)}>
                Přijmout objednávku
              </Button>
            </div>
          )}
        </GlobCardSection>
      </GlobCard>
    </React.Fragment>
  );
};
