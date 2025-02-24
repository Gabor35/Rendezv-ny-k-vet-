import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('felhasz'));
    if (storedUser) {
      setUser(storedUser);
      setAvatar(`http://images.balazska.nhely.hu/${storedUser.profilePicturePath}`);
      navigate('/events');  // Ha a felhasználó már be van jelentkezve, irányítsd az események oldalra
    }
  }, [navigate]);

  const handleLogout = async () => {
    if (user?.token) {
      try {
        const logoutUrl = `http://localhost:5000/api/Logout/${user.token}`;
        const response = await axios.post(logoutUrl);
        console.log(response.data);
        alert('Kijelentkezés sikeres!');
      } catch (error) {
        console.error('Hiba történt a kijelentkezés során:', error);
      }
    }

    localStorage.removeItem('felhasz');
    setUser(null);
    setAvatar('');
    alert('Sikeres kijelentkezés!');
    navigate('/login');  // Navigáljunk a kezdőlapra kijelentkezéskor
  };

  const handleLogin = async () => {
    try {
      const saltResponse = await axios.post(
        `http://localhost:5000/api/Login/GetSalt/${loginName}`
      );
      const salt = saltResponse.data;
      const tmpHash = sha256(password + salt.toString());

      const loginResponse = await axios.post('http://localhost:5000/api/Login', {
        loginName,
        tmpHash,
      });

      if (loginResponse.status === 200) {
        let userData = loginResponse.data;
        localStorage.setItem('felhasz', JSON.stringify(userData));
        setUser(userData);
        setAvatar(`http://images.balazska.nhely.hu/${userData.profilePicturePath}`);

        // Átirányítás az eseményrendező oldalra
        navigate('/events');

        // Oldal frissítése a sikeres bejelentkezés után
        window.location.reload();  // Ez újratölti az oldalt
      } else {
        alert('Hiba történt a bejelentkezéskor!');
      }
    } catch (error) {
      alert('Hiba történt: ' + error.message);
    }
  };

  const styles = {
    zoom: {
      transition: 'transform .2s',
    },
    zoomHover: {
      transform: 'scale(1.03)', // Nagyítás hover hatásra
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'transparent',
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '300px',
    },
    avatar: {
      marginTop: '20px',
      borderRadius: '50%',
    },
  };

  return user ? (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Sikeres Belépés, {user.name}! </h2>
        {avatar && (
          <img
            src={avatar}
            width="60%"
            height="60%"
            alt="Avatar"
            style={styles.avatar}
          />
        )}
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-3"
        >
          Kijelentkezés
        </button>
      </div>
    </div>
  ) : (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Bejelentkezés</h2>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
        />
        <button
          onClick={handleLogin}
          className="btn btn-secondary w-100"
          style={{
            ...styles.zoom,
            ...(isHovered ? styles.zoomHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Bejelentkezés
        </button>
      </div>
    </div>
  );
};
