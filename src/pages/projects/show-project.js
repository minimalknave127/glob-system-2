import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobHeader, GlobPaper } from "../../components/design/glob";
import axios from "axios";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { Work, TrackChanges, Room, VpnKey } from "@material-ui/icons";
import PaperCard from "../../components/design/glob-pack/cards/paper-card";
import moment from "moment";

const { REACT_APP_BACKEND_URL } = process.env;

const ShowProject = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const url = REACT_APP_BACKEND_URL + "api/projects/" + id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get(url, config).then(({ data }) => {
      console.log(data);
      setData(data.data);
    });
  }, []);
  return (
    <Fragment>
      <GlobHeader title="Projekt" desc="Přehled projektu" />
      <section className="mt-5">
        <Grid container alignItems="center">
          <Grid item>
            <PaperCard title="Základní info">
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Název projektu"
                    secondary={data.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <TrackChanges />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Poslední změna"
                    secondary={moment(data.last_change).format("DD.MM.YYYY")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Room />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Adresa projektu"
                    secondary={data.adress}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <VpnKey />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Interní číslo projektu"
                    secondary={data.id}
                  />
                </ListItem>
              </List>
            </PaperCard>
          </Grid>
        </Grid>
      </section>
    </Fragment>
  );
};
export default ShowProject;
