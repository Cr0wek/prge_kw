import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Services(props) {
  return (
    <div>
      Services
      <Button
        className="services__button"
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/map"
      >
        START
      </Button>
    </div>
  );
}

export default Services;
