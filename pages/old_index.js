import React from "react";
import EditorTabs from "./components/EditorTabs";
import Grid from "@mui/material/Grid";
import CatCanvas from "./components/CatCanvas";
import { Typography } from "@mui/material";

const cavasStyle = {
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: "auto",
  display: "block",
  width: "800px",
};

export default function index() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography style={{ textAlign: "center" }} variant={"h3"}>
            Photon-RS Cat Editor
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ margin: "auto" }}>
          <CatCanvas style={cavasStyle} />
        </Grid>

        <Grid item xs={12}>
          <EditorTabs />
        </Grid>
      </Grid>
    </div>
  );
}
