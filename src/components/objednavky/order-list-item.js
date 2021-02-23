import { Paper } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const OrderListItem = (props) => {
    const [deadline, setDeadline] = useState("after");
    const checkDate = () => {

        if (moment().isAfter(props.date, 'day')) {
            console.log("Po termínu");
            setDeadline("after");
        } else if (moment().isSame(props.date, 'day')) {
            setDeadline("today")
        } else {
            setDeadline("before")
        }
    }
    useEffect(() => {
        checkDate();
    })

    return (
        /* <div className="p-4">
            <h5 className="pr-3" style={{ fontWeight: "500" }}>123354</h5>
            <h5 style={{ fontWeight: "500" }}>Sklad Písnice</h5>
            <h5 style={{ fontWeight: "500" }}>Adam Novák</h5>
        </div> */
            <Paper component="tr" onClick={() => props.history.push("/objednavky?action=showOrder&orderId=" + props.orderId)}>
                <td>{props.orderId}</td>
            <td>{props.storage}</td>
            <td>{props.user}</td>
            <td>{moment(props.date).format("DD.MM.YYYY")}</td>
            {deadline === "before" ? <td style={{ color: "green" }}>V termínu</td> : deadline === "today" ? <td style={{ color: "orange" }}>Poslední den</td> : <td style={{ color: "red" }}>Po termínu</td>}
            </Paper>

    )
}
export default withRouter(OrderListItem);