import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      // Redirect or update state to reflect the user is logged in
    } catch (error) {
      console.error('Login error', error.response.data);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);
      const response = await axios.post('http://localhost:3001/api/auth/google', {
        token: credentialResponse.credential
      });
      localStorage.setItem('token', response.data.token);
      // Redirect or update state to reflect the user is logged in
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Google Login Failed')}
          render={({ onClick, disabled }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 15px',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#3c4043',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Roboto, sans-serif',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '240px',
              }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                style={{ marginRight: '10px', width: '18px', height: '18px' }}
              />
              Continue with Google
            </button>
          )}
        />
      </div>
    </div>
  );
}

export default Login;