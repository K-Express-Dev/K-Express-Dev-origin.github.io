import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

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
    } catch (error) {
      console.error('Sign up error:', error.response?.data);
    }
  };

  return (
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
    </form>
  );
}

export default SignUp;