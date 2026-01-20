import React from "react";
import { Box, Button, Paper, InputBase } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent"; // Import Twojego komponentu mapy

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
      {/* UI Overlay (na wierzchu mapy) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100, // Musi być nad mapą
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          pointerEvents: "none", // Żeby kliki przechodziły do mapy tam gdzie nie ma przycisków
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/services")}
          sx={{
            bgcolor: "#3b82f6",
            borderRadius: 5,
            pointerEvents: "auto", // Włączamy kliki dla przycisku
            height: 40,
          }}
        >
          POWRÓT
        </Button>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            borderRadius: 5,
            border: "1px solid #999",
            bgcolor: "rgba(255,255,255,0.8)",
            pointerEvents: "auto", // Włączamy kliki dla inputa
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, textAlign: "center" }}
            placeholder="WYSZUKAJ"
            inputProps={{ style: { textAlign: "center" } }}
          />
        </Paper>

        {/* Pusty box dla równowagi układu */}
        <Box sx={{ width: 100 }} />
      </Box>

      {/* Twoja mapa OpenLayers */}
      <Box sx={{ width: "100%", height: "100%" }}>
        <MapComponent />
      </Box>
    </Box>
  );
};

export default MapPage;
