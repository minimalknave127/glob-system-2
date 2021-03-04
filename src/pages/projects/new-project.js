import React, { Fragment, useState, useRef, useEffect } from "react";
import { GlobHeader, GlobPaper } from "../../components/design/glob";
import {
  Paper,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Alert from "@material-ui/lab/Alert";
import GoogleMaps from "./components/project-places";
import axios from "axios";
import { withRouter } from "react-router-dom";
// nazev, interni cislo, adresa, typ: soutez, realizace
const { REACT_APP_BACKEND_URL } = process.env;
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1rem",
    marginBottom: theme.spacing(2),
  },
  generalInfo: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  input: {
    margin: theme.spacing(2),
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.main,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const NewProject = (props) => {
  const [uploadedImage, setUploadedImage] = useState();
  const [formData, setFormData] = useState({ name: "", filled: false });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const fileInputRef = useRef();
  const imageRef = useRef();
  const handleFileInput = () => {
    fileInputRef.current.click();
  };
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCreateProject = () => {
    setLoading(true);
    const url = REACT_APP_BACKEND_URL + "api/projects";
    const data = {
      name: formData.name,
      adress: formData.adress,
      type: formData.type,
    };
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.success) {
          props.history.push("/projekty/" + data.rowId);
        }
      });
  };
  useEffect(() => {
    if (formData?.name && formData?.adress && formData?.type) {
      setFormData({ ...formData, filled: true });
    } else if (formData.filled) {
      setFormData({ ...formData, filled: false });
    }
  }, [formData.name, formData.adress, formData.type]);
  return (
    <Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <GlobHeader title="Nový projekt" desc="Vytvořte nový projekt" />
      <Alert severity="info">
        Interní číslo bude projektu přiděleno po jeho vytvoření
      </Alert>
      <section className="mt-5">
        <GlobPaper>
          <Typography className={classes.title} variant="h6">
            Základní údaje
          </Typography>
          <Grid container alignContent="center">
            <Grid item xs={8}>
              <TextField
                onChange={handleInputChange}
                fullWidth
                className={classes.input}
                type="text"
                label="Interní název"
                variant="outlined"
                size="medium"
                name="name"
              />
              <GoogleMaps
                className={classes.input}
                onChange={(val) => {
                  const value = val?.description;
                  const e = {
                    target: {
                      value,
                      name: "adress",
                    },
                  };
                  handleInputChange(e);
                }}
              />
              <FormControl component="fieldset" className={classes.input}>
                <FormLabel component="label">Fáze projektu</FormLabel>
                <RadioGroup
                  row
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="soutez"
                    control={<Radio />}
                    label="Soutěž"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="realizace"
                    control={<Radio />}
                    label="Realizace"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {uploadedImage ? (
                // <div className={classes.image}></div>
                <div className={classes.image}>
                  <img
                    style={{ minWidth: "100%", minHeight: "100%" }}
                    src={URL.createObjectURL(uploadedImage)}
                  />
                </div>
              ) : (
                <Avatar className={classes.image}>
                  {formData?.name.split(" ").length > 1 &&
                  formData?.name.split(" ")[1] !== ""
                    ? formData?.name.split(" ")[0][0].toUpperCase() +
                      " " +
                      formData?.name.split(" ")[1][0].toUpperCase()
                    : formData?.name[0]?.toUpperCase()}
                </Avatar>
              )}
              <Button
                size="small"
                className="mt-3"
                color="primary"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={handleFileInput}
              >
                Nahrát fotku
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </Grid>
          </Grid>
        </GlobPaper>
        <Button
          disabled={!formData.filled}
          className="mt-4"
          variant="contained"
          color="primary"
          onClick={handleCreateProject}
        >
          Vytvořit projekt
        </Button>
      </section>
    </Fragment>
  );
};
export default withRouter(NewProject);
