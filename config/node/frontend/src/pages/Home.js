import React from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
function Home(props) {
  return (
    <div>
      <h1 className="home__header">GEOPORTAL</h1>
      <Typography>
        Geoportal tematyczny poświęcony danym przestrzennym
      </Typography>
      <Button className="home__button" variant="contained" color="primary">
        START
      </Button>
    </div>
  );
}

export default Home;
