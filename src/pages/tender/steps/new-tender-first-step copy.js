import React, { useState, useEffect } from "react";
import { GlobCardSection } from "../../../components/design/card";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ImportExcel } from "../tender-import-excel";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import { AddItem } from "../add-item";
import { filterByValue } from "../../../functions/global-functions";
import PropTypes from "prop-types";

//const fakeItems = [{ "code": "113106121", "name": "Rozebrání dlažeb z betonových nebo kamenných dlaždic komunikací pro pěší ručně", "mj": "m2", "amount": 126.343, "price": 64, "globalPrice": 8085.95, "subItems": [] }, { "code": "113106121", "name": "Rozebrání dlažeb z betonových nebo kamenných dlaždic komunikací pro pěší ručně", "mj": "m2", "amount": 126.343, "price": 64, "globalPrice": 8085.95, "subItems": [] }, { "code": "113107112", "name": "Odstranění podkladu z kameniva těženého tl do 200 mm ručně", "mj": "m2", "amount": 177.555, "price": 168, "globalPrice": 29829.24, "subItems": [] }, { "code": "113107123", "name": "Odstranění podkladu z kameniva drceného tl do 300 mm ručně", "mj": "m2", "amount": 21.38, "price": 521, "globalPrice": 11138.98, "subItems": [] }, { "code": "113107131", "name": "Odstranění podkladu z betonu prostého tl do 150 mm ručně", "mj": "m2", "amount": 35.058, "price": 608, "globalPrice": 21315.26, "subItems": [] }, { "code": "113107143", "name": "Odstranění podkladu živičného tl do 150 mm ručně", "mj": "m2", "amount": 21.38, "price": 309, "globalPrice": 6606.42, "subItems": [] }, { "code": "113202111", "name": "Vytrhání obrub krajníků obrubníků stojatých", "mj": "m", "amount": 1.9, "price": 59.9, "globalPrice": 113.81, "subItems": [] }, { "code": "132212111", "name": "Hloubení rýh š do 800 mm v soudržných horninách třídy těžitelnosti I, skupiny 3 ručně", "mj": "m3", "amount": 91.886, "price": 1300, "globalPrice": 119451.8, "subItems": [] }, { "code": "162211311", "name": "Vodorovné přemístění výkopku z horniny třídy těžitelnosti I, skupiny 1 až 3 stavebním kolečkem do 10 m", "mj": "m3", "amount": 91.886, "price": 84, "globalPrice": 7718.42, "subItems": [] }, { "code": "162211319", "name": "Příplatek k vodorovnému přemístění výkopku z horniny třídy těžitelnosti I, skupiny 1 až 3 stavebním kolečkem ZKD 10 m", "mj": "m3", "amount": 91.886, "price": 91.3, "globalPrice": 8389.19, "subItems": [] }, { "code": "162751117", "name": "Vodorovné přemístění do 10000 m výkopku/sypaniny z horniny třídy těžitelnosti I, skupiny 1 až 3", "mj": "m3", "amount": 35.149, "price": 256, "globalPrice": 8998.14, "subItems": [] }, { "code": "162751119", "name": "Příplatek k vodorovnému přemístění výkopku/sypaniny z horniny třídy těžitelnosti I, skupiny 1 až 3 ZKD 1000 m přes 10000 m", "mj": "m3", "amount": 351.49, "price": 19.4, "globalPrice": 6818.91, "subItems": [] }, { "code": "167111101", "name": "Nakládání výkopku z hornin třídy těžitelnosti I, skupiny 1 až 3 ručně", "mj": "m3", "amount": 35.149, "price": 328, "globalPrice": 11528.87, "subItems": [] }, { "code": "171201221", "name": "Poplatek za uložení na skládce (skládkovné) zeminy a kamení kód odpadu 17 05 04", "mj": "t", "amount": 70.298, "price": 657, "globalPrice": 46185.79, "subItems": [] }, { "code": "171251201", "name": "Uložení sypaniny na skládky nebo meziskládky", "mj": "m3", "amount": 35.149, "price": 18.5, "globalPrice": 650.26, "subItems": [] }, { "code": "174111101", "name": "Zásyp jam, šachet rýh nebo kolem objektů sypaninou se zhutněním ručně", "mj": "m3", "amount": 56.737, "price": 218, "globalPrice": 12368.67, "subItems": [] }, { "code": "311272r01", "name": "Zdivo zpórobetonových tvárnic na tenké maltové lože, tl. zdiva 250 mm - vyzdění meziokenních vložek, vč. ukotvení k navazujícím konstrukcím", "mj": "kus", "amount": 30, "price": 2500, "globalPrice": 75000, "subItems": [] }, { "code": "430321r01", "name": "D+M přístupové rampy č.1, vč. základu a ocelové nosné konstrukce - podrobná specifikace viz výkres D.1.1b-25 Vstupní rampy č.1 a č.2 - zámečnické výrobky", "mj": "kpl", "amount": 1, "price": 120000, "globalPrice": 120000, "subItems": [] }, { "code": "430321r02", "name": "D+M přístupové rampy č.2, vč. základu a ocelové nosné konstrukce - podrobná specifikace viz výkres D.1.1b-25 Vstupní rampy č.1 a č.2 - zámečnické výrobky", "mj": "kpl", "amount": 1, "price": 120000, "globalPrice": 120000, "subItems": [] }, { "code": "430321r03", "name": "D+M přístupové rampy č.3, vč. základu a ocelové nosné konstrukce - podrobná specifikace viz výkres D.1.1b-26 Vstupní rampa č.3 - zámečnické výrobky", "mj": "kpl", "amount": 1, "price": 95000, "globalPrice": 95000, "subItems": [] }, { "code": "430321r04", "name": "D+M přístupové rampy č.4, vč. základu a ocelové nosné konstrukce - podrobná specifikace viz výkres D.1.1b-27 Vstupní rampy č.4 a č.5 - zámečnické výrobky", "mj": "kpl", "amount": 1, "price": 140000, "globalPrice": 140000, "subItems": [] }, { "code": "430321r05", "name": "D+M přístupové rampy č.5, vč. základu a ocelové nosné konstrukce - podrobná specifikace viz výkres D.1.1b-27 Vstupní rampy č.4 a č.5 - zámečnické výrobky", "mj": "kpl", "amount": 1, "price": 140000, "globalPrice": 140000, "subItems": [] }, { "code": "430321r11", "name": "D+M přístupového schodiště č.1, vč. základu a prefabrikované nosné konstrukce - podrobná specifikace viz Výpis betonových výrobků - prefabrikované žel. bet. schodiště č.1", "mj": "kpl", "amount": 1, "price": 85000, "globalPrice": 85000, "subItems": [] }, { "code": "430321r12", "name": "D+M přístupového schodiště č.2, vč. základu a prefabrikované nosné konstrukce - podrobná specifikace viz Výpis betonových výrobků - prefabrikované žel. bet. schodiště č.2", "mj": "kpl", "amount": 1, "price": 85000, "globalPrice": 85000, "subItems": [] }, { "code": "430321r13", "name": "D+M přístupového schodiště č.3, vč. základu a prefabrikované nosné konstrukce - podrobná specifikace viz Výpis betonových výrobků - prefabrikované žel. bet. schodiště č.3", "mj": "kpl", "amount": 1, "price": 85000, "globalPrice": 85000, "subItems": [] }, { "code": "430321r14", "name": "D+M přístupového schodiště č.4, vč. základu a prefabrikované nosné konstrukce - podrobná specifikace viz Výpis betonových výrobků - prefabrikované žel. bet. schodiště č.4", "mj": "kpl", "amount": 1, "price": 75000, "globalPrice": 75000, "subItems": [] }, { "code": "564851111", "name": "Podklad ze štěrkodrtě ŠD tl 150 mm", "mj": "m2", "amount": 21.38, "price": 162, "globalPrice": 3463.56, "subItems": [] }, { "code": "564861111", "name": "Podklad ze štěrkodrtě ŠD tl 200 mm", "mj": "m2", "amount": 152.635, "price": 211, "globalPrice": 32205.99, "subItems": [] }, { "code": "572340r01", "name": "Vyspravení krytu komunikací asfaltovým betonem tl do 100 mm", "mj": "m2", "amount": 21.38, "price": 950, "globalPrice": 20311, "subItems": [] }, { "code": "599141r01", "name": "Napojení na stávající asflatový povrch živičnou zálivkou", "mj": "m", "amount": 58.5, "price": 61.6, "globalPrice": 3603.6, "subItems": [] }, { "code": "612131121", "name": "Penetrační disperzní nátěr vnitřních stěn nanášený ručně", "mj": "m2", "amount": 333.39, "price": 59.3, "globalPrice": 19770.03, "subItems": [] }, { "code": "612311131", "name": "Potažení vnitřních stěn vápenným štukem tloušťky do 3 mm", "mj": "m2", "amount": 333.39, "price": 134, "globalPrice": 44674.26, "subItems": [] }, { "code": "612325302", "name": "Vápenocementová štuková omítka ostění nebo nadpraží", "mj": "m2", "amount": 56.14, "price": 743, "globalPrice": 41712.02, "subItems": [] }, { "code": "613131121", "name": "Penetrační disperzní nátěr vnitřních pilířů nebo sloupů nanášený ručně", "mj": "m2", "amount": 57.6, "price": 78.2, "globalPrice": 4504.32, "subItems": [] }, { "code": "613142001", "name": "Potažení vnitřních pilířů nebo sloupů sklovláknitým pletivem vtlačeným do tenkovrstvé hmoty", "mj": "m2", "amount": 57.6, "price": 259, "globalPrice": 14918.4, "subItems": [] }, { "code": "613311131", "name": "Potažení vnitřních pilířů nebo sloupů vápenným štukem tloušťky do 3 mm", "mj": "m2", "amount": 57.6, "price": 202, "globalPrice": 11635.2, "subItems": [] }, { "code": "621131121", "name": "Penetrační nátěr vnějších podhledů nanášený ručně - systémové řešení Caparol", "mj": "m2", "amount": 655.596, "price": 56.8, "globalPrice": 37237.85, "subItems": [] }, { "code": "621142001", "name": "Potažení vnějších podhledů sklovláknitým pletivem vtlačeným do tenkovrstvé hmoty - systémové řešení Caparol", "mj": "m2", "amount": 655.596, "price": 224, "globalPrice": 146853.5, "subItems": [] }, { "code": "621221011", "name": "Montáž kontaktního zateplení vnějších podhledů lepením a mechanickým kotvením desek z minerální vlny s podélnou orientací tl do 80 mm - systémové řešení Caparol", "mj": "m2", "amount": 655.596, "price": 758, "globalPrice": 496941.77, "subItems": [] }, { "code": "63151519", "name": "deska tepelně izolační minerální kontaktních fasád podélné vlákno λ=0,036 tl 50mm", "mj": "m2", "amount": 753.935, "price": 194, "globalPrice": 146263.39, "subItems": [] }, { "code": "621531021", "name": "Tenkovrstvá silikonová zrnitá omítka tl. 2,0 mm včetně penetrace vnějších podhledů - systémové řešení Caparol", "mj": "m2", "amount": 655.596, "price": 367, "globalPrice": 240603.73, "subItems": [] }, { "code": "622131121", "name": "Penetrační nátěr vnějších stěn nanášený ručně - systémové řešení Caparol", "mj": "m2", "amount": 5567.152, "price": 49.2, "globalPrice": 273903.88, "subItems": [] }, { "code": "622142001", "name": "Potažení vnějších stěn sklovláknitým pletivem vtlačeným do tenkovrstvé hmoty", "mj": "m2", "amount": 5567.152, "price": 195, "globalPrice": 1085594.64, "subItems": [] }, { "code": "622211011", "name": "Montáž kontaktního zateplení vnějších stěn lepením a mechanickým kotvením polystyrénových desek tl do 80 mm - systémové řešení Caparol", "mj": "m2", "amount": 754.008, "price": 589, "globalPrice": 444110.71, "subItems": [] }, { "code": "ISV.8591057303067", "name": "Isover EPS SOKL 3000  - 80mm, λD = 0,035 (W·m-1·K-1),1250x600x80mm, soklové desky s nízkou nasákavostí a vysokou odolností proti průrazu pro tepelné izolace stěn v místech se zvýšeným namáháním vlhkostí.", "mj": "m2", "amount": 382.453, "price": 193.62, "globalPrice": 74050.55, "subItems": [] }];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "10%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  subItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  price: {
    color: theme.palette.text.secondary,
  },
  customIcon: {
    width: theme.typography.pxToRem(20),
    height: theme.typography.pxToRem(20),
    marginRight: theme.typography.pxToRem(8),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const TenderFirstStep = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const [importOpen, setImportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const [addItemDialog, setAddItemDialog] = useState(false);
  const [addItemInfo, setAddItemInfo] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const numOfPages = Math.ceil(items.length / postsPerPage);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // opening dialog for creating new item
  const handleNewItem = (index) => {
    //get current item from array
    const arrayIndex = index + (currentPage - 1) * postsPerPage;
    const item = items[arrayIndex];

    //set item as data for the dialog
    setAddItemInfo({ ...item, index: arrayIndex });
    setAddItemDialog(true);

    console.log(item);
  };
  //adding new item to array
  const handleAddNewItem = (item) => {
    const itemsArray = items;
    itemsArray[item.index].subItems.push(item);
    setItems(itemsArray);
    setAddItemDialog(false);
  };
  // handle search
  const handleSearch = () => {
    const filtered = filterByValue(allItems, searchInput);
    console.log(filtered);
    setItems(filtered);
  };

  // adding exported items from excel to array
  const setExcelItems = (excelData) => {
    const localItems = items;
    console.log("--------");
    console.warn(excelData);
    console.log("-----------");
    excelData.map((row) => {
      localItems.push({
        ...row,
        subItems: [],
      });
    });
    setItems(localItems);
    setAllItems(localItems);
    props.setItems(localItems);
  };
  useEffect(() => {
    handleSearch();
  }, [searchInput]);
  //simulating added items
  useEffect(() => {
    console.log(props.items);
    if (typeof props.items === "object" && props.items.length > 0) {
      setItems([...props.items]);
      setAllItems([...props.items]);
    }
  }, []);
  return (
    <GlobCardSection name="Zadejte položky">
      <ImportExcel
        open={importOpen}
        onClose={() => setImportOpen(false)}
        setExcelItems={(items) => setExcelItems(items)}
      />
      <AddItem
        open={addItemDialog}
        onClose={() => setAddItemDialog(false)}
        onSubmit={handleAddNewItem}
        itemInfo={addItemInfo}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* eslint-disable-next-line no-undef */}
        <Button onClick={() => setImportOpen(true)} className="my-3">
          <img
            src={require("../../../assets/icons/sheets.svg").default}
            alt={"Excel icon"}
            className={classes.customIcon}
          />
          Importovat data z excelu
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setImportOpen(true)}
          className="my-3"
        >
          <AddIcon className={classes.customIcon} /> Přidat položku
        </Button>
      </div>
      <hr />
      <TextField
        label="Hledat..."
        type="search"
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <hr />
      <div className={classes.root}>
        {items.length < 1 ? (
          <h6 className="ml-3">Žádná data nezadána</h6>
        ) : null}
        {currentPosts.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{item.name}</Typography>
              <Typography className={classes.secondaryHeading}>
                Množství: {item.amount}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                MJ: {item.mj}{" "}
              </Typography>
              <Button onClick={() => handleNewItem(index)}>+</Button>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "75%" }}>
                <div className="ml-2">
                  {item.subItems.map((item, index) => (
                    <div key={index} className={classes.subItem}>
                      <Typography className={classes.heading}>
                        {item.name}
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        Množství: {item.amount}
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        Cena: {item.price} Kč
                      </Typography>
                      {/* <Typography className={classes.price}>{data.price.toLocaleString()} Kč</Typography> */}
                    </div>
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {items.length > 0 ? (
        <Pagination
          className="mt-5"
          style={{ margin: "0 auto", width: "fit-content" }}
          count={numOfPages}
          onChange={(e, val) => setCurrentPage(val)}
          color="primary"
        />
      ) : null}
    </GlobCardSection>
  );
};
TenderFirstStep.propTypes = {
  setItems: PropTypes.func,
  items: PropTypes.array,
};
