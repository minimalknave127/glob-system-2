import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useRef, useState } from "react";
import { units } from "../../../components/globvars";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Table = (props) => {
  const classes = useStyles();
  const unitRef = useRef();
  const ref0 = useRef();
  // const items = [
  //     {
  //         title: "Vrty pro odstřel v hornině tř V hl vrtu do 6 m D vrtu do 70 mm",
  //         value: "Vrty pro odstřel v hornině tř V hl vrtu do 6 m D vrtu do 70 mm"
  //     },
  //     {
  //         title: "Odstřel vrtů při velikosti jednoho odstřelu přes 1000 do 5000 m3",
  //         value: "Odstřel vrtů při velikosti jednoho odstřelu přes 1000 do 5000 m3"
  //     },
  //     {
  //         title: "Dobývání sypaniny rozrývací technikou bez předstřelení v hornině tř. 5",
  //         value: "Dobývání sypaniny rozrývací technikou bez předstřelení v hornině tř. 5"
  //     },
  // ]
  const items = props.urs;

  const [fields, setFields] = useState([
    {
      name: "",
      materialId: 0,
      unit: "",
      amount: 0,
      price: 0,
      id: 0,
      globalId: 0,
    },
  ]);
  const [id, setId] = useState(0);
  const [globalId, setGlobalId] = useState(0);

  const [count, setCount] = useState(0);

  const countFields = () => {
    let price = 0;
    fields.map((field) => {
      price = price + field.price * field.amount;
    });
    console.log(price);
    return price;
  };

  const addField = () => {
    const field = {
      name: "",
      unit: "",
      amount: 0,
      price: 0,
      id: id + 1,
      globalId: globalId + 1,
      materialId: undefined,
    };
    setId(id + 1);
    setGlobalId(globalId + 1);

    const newArr = setFields((fields) => [...fields, field]);
  };
  const removeField = (e) => {
    const globalId = e.target.getAttribute("global-id");
    let newFields = fields.filter((field) => {
      return field.globalId != globalId;
    });
    newFields = newFields.map((field, index) => {
      field.id = index;
      return field;
    });
    setFields(newFields);
    props.setOrders(newFields);
    setId(id - 1);
  };

  const handleChange = (e, val, refName, refFieldId) => {
    // console.log(ref);
    let { name, value } = e.target;
    if (refName && val) {
      name = refName;
      value = val.value;
    }
    if (value === undefined) {
      name = "name";
      if (!val) return;
      value = val.PopisPolozky;
      fillOthers(val, refFieldId);
    }
    console.log("name: " + name);
    const fieldId = refName ? refFieldId : e.target.getAttribute("field-id");
    let object = fields.filter((field) => {
      return field.id == fieldId;
    });
    console.log(fieldId);
    object = object[0];
    object[name] = value === undefined ? "" : value;
    let newArr = [...fields];
    newArr[fieldId] = object;
    setFields(newArr);
    setCount(countFields);
    props.setOrders(newArr);
  };
  const fillOthers = (value, fieldId) => {
    console.log(value);
    let newArr = [...fields];
    console.log(newArr[fieldId]);
    newArr[fieldId].unit = value.MJ;
    newArr[fieldId].price = parseInt(value.Cena);
    newArr[fieldId].materialId = value.KodPolozky;
    console.log(value);
  };

  return (
    <div className={props.className}>
      <Fab color="primary" onClick={addField} size="small">
        <AddIcon />
      </Fab>
      <p className="d-inline-block ml-3">Přidat položku</p>

      <div className="items mt-4">
        {fields.map((field, i) => (
          <div
            className="order-item d-flex justify-content-between align-items-center px-3 py-4 mb-3"
            style={{
              boxShadow: "0px 0.4375rem 1.813rem 0px rgba(0, 0, 0, 0.04)",
            }}
            key={field.globalId}
          >
            <Autocomplete
              noOptionsText="Žádné výsledky"
              size="small"
              name="name"
              field-id={field.id}
              ref={ref0}
              id="combo-box-demo"
              options={items}
              getOptionLabel={(option) => option.PopisPolozky}
              getOptionSelected={(option, val) =>
                option.KodPolozky === val.KodPolozky
              }
              style={{ width: 300 }}
              onChange={(e, val) => handleChange(e, val, "name", field.id)}
              // onChange={e => console.log(e.target.getAttribute("test"))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  ref={params.inputProps.ref}
                  label="Název"
                  variant="outlined"
                />
              )}
            />
            <TextField
              value={fields[field.id].price}
              name="price"
              style={{ width: 130 }}
              onChange={(e) => handleChange(e)}
              label="Cena"
              type="number"
              inputProps={{ "field-id": field.id, "global-id": field.globalId }}
              variant="outlined"
              size="small"
            />
            {/* <TextField name="unit" onChange={e => handleChange(e)} label="Jednotka" type="text" variant="outlined" size="small" inputProps={{ 'field-id': field.id, 'global-id': field.globalId }} /> */}
            <TextField
              name="amount"
              style={{ width: 130 }}
              onChange={(e) => handleChange(e)}
              label="Množství"
              type="number"
              variant="outlined"
              size="small"
              inputProps={{ "field-id": field.id, "global-id": field.globalId }}
            />
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Jednotka
              </InputLabel>
              <Select
                ref={unitRef}
                value={fields[field.id].unit}
                //onChange={e => handleChange(e, e.target, unitRef)}
                //onChange={() => console.log(unitRef.current.getAttribute("name"))}
                onChange={(e) =>
                  handleChange(e, { value: e.target.value }, "unit", field.id)
                }
                label="Jednotka"
                name="unit"
                field-id={field.id}
                inputProps={{
                  name: "unit",
                  wtfisthat: "eeereeeeeeeeeeee",

                  id: "outlined-age-native-simple",
                }}
              >
                {units.map((unit, i) => {
                  return (
                    <MenuItem key={i} value={unit}>
                      {unit}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography>
              Celkem:{" "}
              <b>{fields[field.id].amount * fields[field.id].price} Kč</b>
            </Typography>
            {/* <MDBIcon global-id={field.globalId} field-id={field.id} className="danger-text" style={{ cursor: "pointer" }} icon="minus" onClick={removeField} /> */}
          </div>
        ))}
        <div
          className="mt-4"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography>
            Souhrn: <b>{count} Kč</b>
          </Typography>
        </div>
      </div>
    </div>
  );
};
