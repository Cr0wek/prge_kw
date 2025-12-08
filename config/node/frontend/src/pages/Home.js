import React from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function Home(props) {
  return (
    <div>
      <h1 className="home__header">GEOPORTAL</h1>
      <Typography>
        Geoportal tematyczny poświęcony danym przestrzennym
      </Typography>
      <Button
        className="home__button"
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="services"
      >
        START
      </Button>
    </div>
  );
}

export default Home;
