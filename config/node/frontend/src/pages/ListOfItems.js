import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  InputBase,
  Fab,
  Avatar,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

const ListOfItems = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const titles = {
    events: "Wydarzenia",
    artists: "Artyści",
    employees: "Pracownicy",
  };
  const title = titles[type] || "Lista";

  // DANE TESTOWE
  const eventsData = [
    { title: "JUWE FEST", desc: "Stadion Narodowy", color: "#d32f2f" },
    { title: "jUWenalia", desc: "Letnia Scena Progresji", color: "#f57c00" },
    { title: "Varsonalia", desc: "Stadion Syrenki", color: "#c2185b" },
  ];

  const listData = [
    {
      name: "Marian Iżycki",
      address: "Poselska 81/4, Wwa",
      event: "jUWenalia",
      role: "Ochrona",
    },
    {
      name: "Zdzisław Nowak",
      address: "Lubelska 73/12, Wwa",
      event: "jUWenalia",
      role: "Bar",
    },
    {
      name: "Mariusz Bochenek",
      address: "Bartnicza 20/44, Wwa",
      event: "Varsonalia",
      role: "Ochrona",
    },
    {
      name: "Adrian Jabłecznik",
      address: "Wał Miedzeszyński 71",
      event: "JUWE FEST",
      role: "Bar",
    },
    {
      name: "Mateusz Zawistowski",
      address: "Poniatowskiego 91",
      event: "JUWE FEST",
      role: "Ochrona",
    },
  ];

  // --- HEADER ---
  const Header = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mb: 6, // Zwiększyłem margines pod nagłówkiem dla oddechu
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1400px",
          px: { xs: 2, md: 4 },
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/services")}
          sx={{
            bgcolor: "#3b82f6",
            borderRadius: 50,
            px: 4, // Szerszy przycisk
            py: 1,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "0.9rem",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)", // Ładniejszy cień
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#2563eb",
              transform: "translateY(-2px)", // Efekt uniesienia
              transition: "transform 0.2s",
            },
          }}
        >
          POWRÓT
        </Button>

        {/* Wyszukiwarka */}
        <Paper
          elevation={4} // Większy cień
          sx={{
            width: "100%",
            maxWidth: 600, // Szersza wyszukiwarka
            mx: 4,
            borderRadius: 50,
            bgcolor: "#fff",
            p: "6px 20px", // Większy padding w środku
            display: "flex",
            alignItems: "center",
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <InputBase
            fullWidth
            sx={{ textAlign: "center", color: "#333", fontSize: "1.1rem" }}
            placeholder="WYSZUKAJ..."
            inputProps={{ style: { textAlign: "center" } }}
          />
        </Paper>

        {/* TYTUŁ STRONY - STYLIZACJA */}
        <Typography
          variant="h3" // Większy nagłówek
          sx={{
            fontWeight: 900, // Bardzo gruby
            textTransform: "uppercase",
            letterSpacing: "0.1em", // Rozstrzelone litery
            color: "#1e293b", // Ciemny, elegancki kolor (nie czarny)
            width: "auto",
            minWidth: "200px",
            textAlign: "right",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)", // Delikatny cień tekstu
            display: { xs: "none", md: "block" }, // Ukrywanie na telefonach, widoczne na tablecie/PC
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#E5E5E5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
        pb: 10,
        // --- ZMIANA POZYCJI PASKI (WIĘKSZY ODSTĘP) ---
        pt: 18, // ok. 144px od góry - pasek będzie wyraźnie niżej
      }}
    >
      <Header />

      {/* --- WIDOK 1: WYDARZENIA (KAFLE) --- */}
      {type === "events" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ maxWidth: "1400px", px: 4 }}
          >
            {eventsData.map((ev, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={idx}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Paper
                  elevation={8} // Głębszy cień kafelków
                  sx={{
                    height: 420,
                    width: "100%",
                    maxWidth: 340,
                    minWidth: 280,
                    borderRadius: 5,
                    bgcolor: "#fff",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", // Płynniejsza animacja
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "65%",
                      bgcolor: ev.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        color: "rgba(255,255,255,0.2)",
                        fontWeight: "bold",
                      }}
                    >
                      {idx + 1}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, color: "#000", mb: 0.5 }}
                    >
                      {ev.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666" }}>
                      {ev.desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* --- WIDOK 2: ARTYŚCI I PRACOWNICY (WIZYTÓWKI) --- */}
      {(type === "artists" || type === "employees") && (
        <Box
          sx={{
            width: "100%",
            px: { xs: 2, md: 4 },
            maxWidth: "1400px",
          }}
        >
          <Grid container spacing={3}>
            {listData.map((row, idx) => (
              <Grid item xs={12} sm={6} lg={4} key={idx}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    transition: "0.2s",
                    border: "1px solid rgba(0,0,0,0.05)",
                    "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: type === "artists" ? "#9333ea" : "#3b6cb3",
                      mr: 2,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {type === "artists" ? (
                      <StarIcon fontSize="large" />
                    ) : (
                      <PersonIcon fontSize="large" />
                    )}
                  </Avatar>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#1e293b",
                        lineHeight: 1.2,
                      }}
                    >
                      {row.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "#64748b", mt: 0.5, mb: 1.5 }}
                    >
                      {row.address}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        label={row.event}
                        size="small"
                        sx={{
                          bgcolor: "#eff6ff",
                          color: "#2563eb",
                          fontWeight: "bold",
                          borderRadius: "8px",
                        }}
                      />
                      {type === "employees" && (
                        <Chip
                          label={row.role}
                          size="small"
                          sx={{
                            bgcolor:
                              row.role === "Ochrona" ? "#1f2937" : "#f97316",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          bgcolor: "#3b82f6",
          width: 70,
          height: 70,
          boxShadow: "0 8px 16px rgba(59, 130, 246, 0.4)",
          "&:hover": { bgcolor: "#2563eb" },
        }}
        onClick={() => navigate(`/addentry/${type}`)}
      >
        <AddIcon sx={{ fontSize: 36 }} />
      </Fab>
    </Box>
  );
};

export default ListOfItems;
