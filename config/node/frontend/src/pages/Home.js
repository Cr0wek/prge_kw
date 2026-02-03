import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "#E5E5E5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
      }}
    >
      <Typography variant="h2" sx={{ color: "#4a6fa5", fontWeight: "bold" }}>
        GEO<span style={{ color: "#000000" }}>PORTAL</span>{" "}
        {/* PORTAL zmieniony na czarny */}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ mb: 4, textAlign: "center", px: 2, color: "#000" }}
      >
        tematyczny do zarządzania
        <br />
        wydarzeniami kulturalnymi i artystami
      </Typography>
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/POL_location_map.svg/1099px-POL_location_map.svg.png"
        }
        alt="Mapa Polski"
        height={600}
      />

      <Button
        variant="contained"
        size="large"
        endIcon={<PlayArrowIcon />}
        onClick={() => navigate("/services")}
        sx={{
          borderRadius: 50,
          px: 6,
          py: 1.5,
          bgcolor: "#4a6fa5",
          color: "#fff",
          fontSize: "1.2rem",
          mt: 4,
          "&:hover": { bgcolor: "#3b5c8d" },
        }}
      >
        START
      </Button>
    </Box>
  );
};

export default Home;
