import React, { useState } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';

export const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");

  const handleLogout = async () => {
    if (user?.token) {
      try {
        const logoutUrl = `http://localhost:5000/api/Logout/${user.token}`;
        const response = await axios.post(logoutUrl);
        console.log(response.data);
        alert("Kijelentkezés sikeres!");
      } catch (error) {
        console.error("Hiba történt a kijelentkezés során:", error);
      }
    }
 
  localStorage.removeItem("felhasz");
    setUser(null);
    setAvatar("");
    alert("Sikeres kijelentkezés!");
    window.location.reload(); // Oldal újratöltése, hogy a login form jelenjen meg
  };
  const handleLogin = async () => {
    try {
      const saltResponse = await axios.post(`http://localhost:5000/api/Login/GetSalt/${loginName}`);
      const salt = saltResponse.data;
      const tmpHash = sha256(password + salt.toString());

      const loginResponse = await axios.post("http://localhost:5000/api/Login", {
        loginName,
        tmpHash,
      });

      if (loginResponse.status === 200) {
        let userData = loginResponse.data;
        localStorage.setItem("felhasz", JSON.stringify(userData));
        setUser(userData);
        setAvatar(`http://images.balazska.nhely.hu/${userData.profilePicturePath}`);
        alert(`Sikeres bejelentkezés! Felhasználó: ${userData.name}`);
      } else {
        alert("Hiba történt a bejelentkezéskor!");
      }
    } catch (error) {
      alert("Hiba történt: " + error.message);
    }
  };

  return user ? (
    <>
      <h2>Belépve: {user.name}</h2>
      {avatar && (
        <img
          src={avatar}
          width="60%"
          height="60%"
          alt="Avatar"
          style={{ marginTop: "20px", borderRadius: "50%" }}
        />
      )}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Kijelentkezés
      </button>
    </>
  ) : (
    <div className="container mt-4">
      <h2>Bejelentkezés</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" onChange={(e) => setLoginName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó</label>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Bejelentkezés
        </button>
      </form>
    </div>
  );
};
