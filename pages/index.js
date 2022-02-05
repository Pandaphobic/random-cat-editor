import React from "react";
import EditorTabs from "./components/EditorTabs";
import Grid from "@mui/material/Grid";
import CatMeme from "./components/CatMeme";

export default function index() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>Header Area</div>
        </Grid>
        <Grid item xs={12}>
          <CatMeme />
        </Grid>

        <Grid item xs={12}>
          <EditorTabs />
        </Grid>
      </Grid>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </div>
  );
}
