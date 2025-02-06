import React from 'react';

export const Login =() => {
  return (
    <div className="container mt-4">
      <h2>Bejelentkezés</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Bejelentkezés</button>
      </form>
    </div>
  );
}

