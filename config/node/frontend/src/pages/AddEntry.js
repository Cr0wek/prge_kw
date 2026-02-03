import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddEntry = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const config = {
    events: {
      title: "Dodaj Nowe Wydarzenie",
      endpoint: "http://localhost:10000/app/insert_event",
    },
    artists: {
      title: "Dodaj Artystę",
      endpoint: "http://localhost:10000/app/insert_user",
    },
    employees: {
      title: "Dodaj Pracownika",
      endpoint: "http://localhost:10000/app/insert_user",
    },
  };

  const currentConfig = config[type] || config.events;

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    nick: "",
    role: "",
    event_name: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "info", message: "Wysyłanie danych..." });

    try {
      let payload = {};
      if (type === "events") {
        payload = { name: formData.name, location: formData.location };
      } else {
        payload = {
          name: formData.name,
          location: formData.location,
          event_name: formData.event_name,
          role: type === "artists" ? "Artysta" : formData.role,
          nick: type === "artists" ? formData.nick : "",
        };
      }

      const response = await fetch(currentConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && !result.error) {
        setStatus({ type: "success", message: "Dodano pomyślnie!" });
        setFormData({
          name: "",
          location: "",
          nick: "",
          role: "",
          event_name: "",
        });
      } else {
        throw new Error(result.error || "Błąd serwera");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "#E5E5E5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      {}
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
        >
          Anuluj i wróć
        </Button>

        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, bgcolor: "#fff" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1e293b", mb: 4 }}
          >
            {currentConfig.title}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={type === "events" ? "Nazwa Wydarzenia" : "Imię i Nazwisko"}
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label={type === "events" ? "Lokalizacja" : "Adres zamieszkania"}
              name="location"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
              required
            />

            {(type === "artists" || type === "employees") && (
              <TextField
                fullWidth
                label="Przypisane wydarzenie (Nazwa)"
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                margin="normal"
                required
              />
            )}

            {type === "artists" && (
              <TextField
                fullWidth
                label="Pseudonim (Nick)"
                name="nick"
                value={formData.nick}
                onChange={handleChange}
                margin="normal"
              />
            )}

            {type === "employees" && (
              <TextField
                fullWidth
                label="Rola / Stanowisko"
                name="role"
                value={formData.role}
                onChange={handleChange}
                margin="normal"
                required
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                mb: 2,
                bgcolor: "#3b82f6",
                height: 50,
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": { bgcolor: "#2563eb" },
              }}
            >
              ZAPISZ DANE
            </Button>

            {status.message && (
              <Alert severity={status.type} sx={{ mt: 2 }}>
                {status.message}
              </Alert>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddEntry;
