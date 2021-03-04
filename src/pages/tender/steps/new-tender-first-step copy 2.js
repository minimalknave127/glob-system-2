import React, { useState, useEffect, Fragment } from "react";
import { GlobCardSection } from "../../design/card";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, Fab } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ImportExcel } from "../tender-import-excel";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '33.33%',
        flexShrink: 0
    },
    subItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    price: {
        color: theme.palette.text.secondary
    },
    customIcon: {
        width: theme.typography.pxToRem(20),
        height: theme.typography.pxToRem(20),
        marginRight: theme.typography.pxToRem(8)
    }
}))

export const TenderFirstStep = (props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [items, setItems] = useState([]);
    const [importOpen, setImportOpen] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const summary = (data) => {
    //     let sum = 0;
    //     data.map(item => {
    //         sum += item.price
    //     });

    //     return sum;
    // }
    const setExcelItems = (excelData) => {
        console.warn(excelData);
        setItems(excelData);
    }

    useEffect(() => {
        setItems(props.items);
    });
    return (
        <GlobCardSection name="Zadejte položky">
            <Button onClick={() => setImportOpen(true)} className="my-4"><img src={require("../../../assets/icons/sheets.svg")} alt={"Excel icon"} className={classes.customIcon} />Importovat data z excelu</Button>
            <ImportExcel open={importOpen} onClose={() => setImportOpen(false)} setExcelItems={(items) => setExcelItems(items)} />
            <div className={classes.root}>
                {items.map((item, index) => (
                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} TransitionProps={{ unmountOnExit: true }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>{item.category}</Typography>
                            <Typography className={classes.secondaryHeading}>{item.subcategory}</Typography>
                            {/* <Typography className={classes.secondaryHeading}>{summary(item.data).toLocaleString()} Kč</Typography> */}
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ width: '75%' }}>
                                <div className="ml-2">
                                    {item.data.map((data, index) => (
                                        <div key={index} className={classes.subItem}>
                                            <Typography>{data.name}</Typography>
                                            <Typography className={classes.price}>{data.price.toLocaleString()} Kč</Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

        </GlobCardSection>
    )
}