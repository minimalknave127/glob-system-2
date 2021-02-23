import { Collapse } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import { links } from "./nav-links";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "white",
    boxShadow: "0px 3px 24px 0px rgba(0,0,0,0.15)",
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    color: "#FFF",
    backgroundColor: "#233044",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navLinks: {
    color: "#FFF",
    textDecoration: "none",
  },
}));
function MainNav(props) {
  const [ready, setReady] = useState(false);
  const [openColl, setOpenColl] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleUpdateColl = (index) => {
    let arr = [...openColl];
    arr[index] = !arr[index];
    setOpenColl(arr);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  // useEffect(() => {
  //     history.listen(() => {
  //         setOpenColl(false);
  //     });
  // });
  useEffect(() => {
    if (!open) {
      setOpenColl(false);
    }
    if (!ready) {
      const arr = [];
      links.map((link) => {
        arr.push(false);
      });
      setOpenColl(arr);
      setReady(true);
    }
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton> */}
          <img
            style={{ width: 120 }}
            src={require("../../media/glob_logo_negative.svg").default}
            alt="Glob logo"
          />
        </div>
        <Divider />
        <List>
          {links.map((link, index) => {
            if (link.collapse) {
              return (
                <div key={index}>
                  <ListItem button onClick={() => handleUpdateColl(index)}>
                    {/* <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon> */}
                    <ListItemText style={{ fontWeight: "bolder" }}>
                      <span style={{ fontWeight: 500 }}>{link.name}</span>
                    </ListItemText>
                    {openColl[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openColl[index]} timeout="auto" unmountOnExit>
                    <List>
                      {link.data.map((link, index) => (
                        <NavLink
                          style={{ textDecoration: "none" }}
                          to={link.to}
                          key={index}
                        >
                          <ListItem className="pl-5" button key={index}>
                            <ListItemText
                              style={{
                                color: "rgba(238, 238, 238, 0.7)",
                                border: "none",
                              }}
                              primary={link.name}
                            />
                          </ListItem>
                        </NavLink>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            } else {
              return (
                <NavLink to={link.to} key={index}>
                  <ListItem button>
                    {/* <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon> */}
                    <ListItemText style={{ fontWeight: "bolder" }}>
                      <span style={{ fontWeight: 500, color: "white" }}>
                        {link.name}
                      </span>
                    </ListItemText>
                  </ListItem>
                </NavLink>
              );
            }
          })}
        </List>
        <Divider />
        {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
      </Drawer>
    </div>
  );
}
export default withRouter(MainNav);
