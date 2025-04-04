import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("https://esemenyrendezo1.azurewebsites.net/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Hiba történt. Próbáld újra.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-100 d-flex justify-content-center align-items-center"
      >
        <Card className="glass-card p-4">
          <Card.Body>
            <h2 className="text-center title text-info">Elfelejtett jelszó</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </Form.Group>
              <motion.button
                type="submit"
                className="btn btn-primary w-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Jelszó visszaállítása
              </motion.button>
            </Form>
            {message && (
              <motion.div
                className="alert alert-success mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {message}
              </motion.div>
            )}
            {error && (
              <motion.div
                className="alert alert-danger mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            <Button
              variant="link"
              className="w-100 mt-2 forgot-password-btn"
              onClick={() => navigate("/")}
            >
              Vissza a bejelentkezéshez
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ForgotPassword;
