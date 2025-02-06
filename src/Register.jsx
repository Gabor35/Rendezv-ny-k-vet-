import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sha256 from "js-sha256";

export const Register = () => {
    const [formData, setFormData] = useState({
        felhasznaloNev: "",
        jelszo: "",
        teljesNev: "",
        email: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateSalt = (length) => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let salt = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            salt += characters.charAt(randomIndex);
        }
        return salt;
    };

    const handleSubmit = async () => {
        const salt = generateSalt(64);
        const hashedPassword = sha256(formData.jelszo + salt);

        const requestBody = {
            id: 0,
            felhasznaloNev: formData.felhasznaloNev,
            teljesNev: formData.teljesNev,
            salt,
            hash: hashedPassword,
            email: formData.email,
            jogosultsag: 1,
            aktiv: 0,
            regisztracioDatuma: new Date().toISOString(),
            fenykepUtvonal: "default.jpg",
        };

        try {
            const response = await axios.post("http://localhost:5106/api/Regisztracio", requestBody);
            alert(response.data);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Hiba történt a regisztráció során!");
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4"
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "300px"
            }}>
                <h2>Regisztráció</h2>
                <input
                    type="text"
                    name="felhasznaloNev"
                    placeholder="Felhasználónév"
                    value={formData.felhasznaloNev}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="password"
                    name="jelszo"
                    placeholder="Jelszó"
                    value={formData.jelszo}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="text"
                    name="teljesNev"
                    placeholder="Teljes név"
                    value={formData.teljesNev}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button
                    onClick={handleSubmit}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}
                >
                    Regisztráció
                </button>
            </div>
        </div>
    );
};
