import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation
      }
    };
    console.log('Sending data:', userData);
    try {
      const response = await axios.post('http://localhost:3001/sign_up', userData);
      console.log('Sign up successful:', response.data);
      localStorage.setItem('token', response.data.token);
      // Redirect or update state to reflect the user is logged in

      setIsSignedUp(true); // Update sign-up status
      localStorage.setItem('isSignedUp', 'true');
      
    } catch (error) {
      console.error('Sign up error:', error.response?.data);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);
      const response = await axios.post('http://localhost:3001/api/auth/google', {
        token: credentialResponse.credential
      });
      localStorage.setItem('token', response.data.token);
      // Redirect or update state to reflect the user is signed up and logged in

      console.log('Google sign up successful:', decodedToken);
      
      setIsSignedUp(true); // Update sign-up status
      localStorage.setItem('isSignedUp', 'true');

    } catch (error) {
      console.error('Google sign up error', error);
    }
  };

  return (
    <div>
      {isSignedUp ? (
        <h1>Login Successful</h1>
      ) : (
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
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Sign Up</button>
          <GoogleLogin onSuccess={handleGoogleSuccess} />
        </form>
      )}
    </div>
  );
}

export default SignUp;