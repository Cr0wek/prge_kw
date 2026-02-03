import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

const ListOfItems = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const titles = {
    events: "Wydarzenia",
    artists: "Artyści",
    employees: "Pracownicy",
  };
  const title = titles[type] || "Lista";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let url = "";
      if (type === "events") {
        url = "http://localhost:10000/app/events";
      } else if (type === "artists" || type === "employees") {
        url = `http://localhost:10000/app/users?type=${type}`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Błąd pobierania danych z serwera");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]); //ponowne uruchomienie

  const Header = () => (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 6 }}
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
            px: 4,
            py: 1,
            color: "#fff",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "#2563eb", transform: "translateY(-2px)" },
          }}
        >
          POWRÓT
        </Button>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#1e293b",
            minWidth: "200px",
            textAlign: "right",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            display: { xs: "none", md: "block" },
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
        pt: 18,
      }}
    >
      <Header />

      {}
      {loading && <CircularProgress size={60} sx={{ mt: 5 }} />}

      {error && (
        <Alert severity="error" sx={{ mt: 5, width: "80%", maxWidth: 600 }}>
          Nie udało się pobrać danych: {error}. Sprawdź czy serwer działa.
        </Alert>
      )}

      {}
      {!loading && !error && type === "events" && (
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
            {data.map((ev, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={ev.id || idx}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    height: 420,
                    width: "100%",
                    maxWidth: 340,
                    minWidth: 280,
                    borderRadius: 5,
                    bgcolor: "#fff",
                    overflow: "hidden",
                    transition: "all 0.3s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  {}
                  <Box
                    sx={{
                      height: "65%",
                      bgcolor: idx % 2 === 0 ? "#d32f2f" : "#f57c00",
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
                      {}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, color: "#000", mb: 0.5 }}
                    >
                      {ev.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666" }}>
                      {ev.location}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {}
      {!loading && !error && (type === "artists" || type === "employees") && (
        <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, maxWidth: "1400px" }}>
          <Grid container spacing={3}>
            {data.map((row, idx) => (
              <Grid item xs={12} sm={6} lg={4} key={row.id || idx}>
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
                      {}
                      {row.nick && (
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            marginLeft: "5px",
                          }}
                        >
                          ({row.nick})
                        </span>
                      )}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "#64748b", mt: 0.5, mb: 1.5 }}
                    >
                      {row.location}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {}
                      <Chip
                        label={row.event_name || "Brak"}
                        size="small"
                        sx={{
                          bgcolor: "#eff6ff",
                          color: "#2563eb",
                          fontWeight: "bold",
                          borderRadius: "8px",
                        }}
                      />

                      {}
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

                      {}
                      {type === "artists" && (
                        <Chip
                          label="Artysta"
                          size="small"
                          sx={{
                            bgcolor: "#9333ea",
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
