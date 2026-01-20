import React, { useState, useEffect } from "react";
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
  const { type } = useParams(); // 'event', 'artist', 'employee'
  const navigate = useNavigate();

  // Konfiguracja pól w zależności od typu
  const config = {
    event: { title: "Dodaj Wydarzenie", fields: ["name", "location"] },
    artist: { title: "Dodaj Artystę", fields: ["name", "address", "event"] },
    employee: {
      title: "Dodaj Pracownika",
      fields: ["name", "address", "role", "event"],
    },
  };

  const currentConfig = config[type] || config.event;

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    role: "",
    event: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "info", message: "Wysyłanie..." });

    // Symulacja wysłania (lub Twój endpoint)
    try {
      console.log("Wysyłanie danych:", { type, ...formData });

      // Tutaj zostawiam Twój oryginalny fetch (zmieniłem endpoint dynamicznie)
      /*
      const response = await fetch(`http://localhost:10000/app/insert_${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      */

      // Symulacja sukcesu
      setTimeout(() => {
        setStatus({ type: "success", message: "Dodano pomyślnie!" });
        setFormData({
          name: "",
          location: "",
          address: "",
          role: "",
          event: "",
        });
      }, 1000);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ alignSelf: "flex-start", mb: 2 }}
      >
        Powrót
      </Button>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          {currentConfig.title}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {currentConfig.fields.includes("name") && (
            <TextField
              fullWidth
              label="Imię i Nazwisko / Nazwa"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          {currentConfig.fields.includes("location") && (
            <TextField
              fullWidth
              label="Lokalizacja"
              name="location"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          {currentConfig.fields.includes("address") && (
            <TextField
              fullWidth
              label="Adres"
              name="address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          {currentConfig.fields.includes("event") && (
            <TextField
              fullWidth
              label="Przypisane Wydarzenie"
              name="event"
              value={formData.event}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          {currentConfig.fields.includes("role") && (
            <TextField
              fullWidth
              label="Rola (np. Ochrona)"
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
            sx={{ mt: 3, mb: 2, bgcolor: "#3b82f6" }}
          >
            Wyślij do bazy
          </Button>

          {status.message && (
            <Alert severity={status.type}>{status.message}</Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEntry;
