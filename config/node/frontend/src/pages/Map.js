import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const MapPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {}
      <Box
        sx={{
          position: "absolute",
          top: 25,
          left: 50,
          width: "100%",
          zIndex: 100,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/services")}
          sx={{
            bgcolor: "#3b82f6",
            borderRadius: 5,
            pointerEvents: "auto",
            height: 40,
          }}
        >
          POWRÓT
        </Button>
        <Box sx={{ width: 200 }} />
      </Box>

      {}
      <Box sx={{ width: "100%", height: "100%" }}>
        <MapComponent />
      </Box>
    </Box>
  );
};

export default MapPage;
