import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import eventsImg from "../assets/events.jpeg";
import mapImg from "../assets/map.jpg";
import artistsImg from "../assets/artists.jpg";
import employeesImg from "../assets/employees.jpeg";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { title: "WYDARZENIA", path: "/list/events", img: eventsImg },
    { title: "GEOPORTAL", path: "/map", img: mapImg },
    { title: "ARTYŚCI", path: "/list/artists", img: artistsImg },
    { title: "PRACOWNICY", path: "/list/employees", img: employeesImg },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#E5E5E5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        py: 4,
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          color: "#3b6cb3",
          fontWeight: "800",
          mb: 8,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Services
      </Typography>

      {}
      <Box
        sx={{ width: "100%", px: 4, display: "flex", justifyContent: "center" }}
      >
        <Grid
          container
          spacing={6}
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: "1600px" }}
        >
          {services.map((service) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={service.title}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                elevation={12}
                sx={{
                  height: 500,
                  width: "100%",
                  maxWidth: 350,
                  minWidth: 280,

                  borderRadius: 6,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "#999",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",

                  // Styl tła (obrazka)
                  backgroundImage: `url(${service.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",

                  "&:hover": {
                    transform: "scale(1.05) translateY(-10px)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                    zIndex: 10,
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                    transition: "opacity 0.3s",
                  },
                }}
                onClick={() => navigate(service.path)}
              >
                {}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 50,
                      px: 5,
                      py: 1.5,
                      bgcolor: "#3b6cb3",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                      "&:hover": { bgcolor: "#2a5291" },
                    }}
                  >
                    {service.title}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Services;
