import React, { useContext, Fragment } from "react";
import { userData } from "../components/userData";
import { GlobHeader } from "../components/design/glob";
import SmallCard from "../components/design/glob-pack/cards/small-card";
import { Chart, LineAdvance, Annotation, Interval } from "bizcharts";
import PaperCard from "../components/design/glob-pack/cards/paper-card";
import { Grid } from "@material-ui/core";

export const Home = (props) => {
  const userInfo = useContext(userData);
  const data = [
    {
      month: "Led",
      city: "Brno",
      temperature: 7,
    },
    {
      month: "Ún",
      city: "Praha",
      temperature: 3.9,
    },
    {
      month: "Břez",
      city: "Brno",
      temperature: 13,
    },
    {
      month: "Dub",
      city: "Praha",
      temperature: 4.2,
    },
    {
      month: "Květ",
      city: "Brno",
      temperature: 16.5,
    },
    {
      month: "Červ",
      city: "Praha",
      temperature: 5.7,
    },
    {
      month: "Červen",
      city: "Brno",
      temperature: 14.5,
    },
    {
      month: "Srp",
      city: "Praha",
      temperature: 8.5,
    },
    {
      month: "Zář",
      city: "Brno",
      temperature: 10,
    },
    {
      month: "Říj",
      city: "Praha",
      temperature: 11.9,
    },
    {
      month: "Lis",
      city: "Brno",
      temperature: 7.5,
    },
    {
      month: "Pros",
      city: "Praha",
      temperature: 15.2,
    },
  ];
  const data2 = [
    { projekty: "Hotové", počet: 10 },
    { projekty: "Právě realizované", počet: 20 },
    { projekty: "Po termínu", počet: 5 },
  ];
  return (
    <Fragment>
      <GlobHeader
        title="Domovská obrazovka"
        desc={"Vítejte zpět " + userInfo.user.name + " ✨"}
      />
      {/* Grid of items */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3} md={6}>
          <SmallCard />
        </Grid>
        <Grid item xs={12} lg={3} md={6}>
          <SmallCard />
        </Grid>
        <Grid item xs={12} lg={3} md={6}>
          <SmallCard />
        </Grid>
        <Grid item xs={12} lg={3} md={6}>
          <SmallCard />
        </Grid>
        <Grid item xs={12} lg={8}>
          <PaperCard title="Stav okresů">
            <Chart
              height={300}
              autoFit
              data={data}
              interactions={["active-region"]}
              padding={[30, 30, 80, 50]}
            >
              <LineAdvance
                shape="smooth"
                point
                area
                position="month*temperature"
                color="city"
              />
              <Annotation.Line>
                start={["min", 7]}
                end={["max", 7]}
                style={{ lineDash: [4, 4], stroke: "red" }}
              </Annotation.Line>
            </Chart>
          </PaperCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <PaperCard title="Stav projektů">
            <Chart
              height={300}
              autoFit
              data={data2}
              padding={[30, 30, 50, 50]}
              color="pocet"
            >
              <Interval position="projekty*počet" />
            </Chart>
          </PaperCard>
        </Grid>
      </Grid>
    </Fragment>
  );
};
