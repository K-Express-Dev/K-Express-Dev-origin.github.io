import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


/**
 * SignUp Component
 * 
 * This component renders a sign-up form with fields for email, password, and password confirmation.
 * It also includes a Google login button for authentication.
 */
function SignUp() {
  // State variables to store email, password, password confirmation, and sign-up status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);



  /* THIS SHOULD BE USED FOR LOGIN AND NOT FOR SIGN UP */ 

  /**
   * useEffect Hook
   * 
   * This hook runs once when the component mounts. It retrieves the 'isSignedUp' status from local storage,
   * logs the status to the console for debugging purposes, and updates the state if the user is signed up.
   */
  /*useEffect(() => {
    // Retrieve the 'isSignedUp' status from local storage
    const signedUpStatus = localStorage.getItem('isSignedUp');
    
    // Log the signed-up status to the console for debugging purposes
    console.log('Signed up status on load:', signedUpStatus);
    
    // If the signed-up status is 'true', update the state to reflect that the user is signed up
    if (signedUpStatus === 'true') {
      setIsSignedUp(true);
    }
  }, []);*/

  /**
   * Handles form submission
   * 
   * @param {Event} e - The form submission event
   */
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

  /**
   * Handles Google login success
   * 
   * @param {Object} response - The response object from Google login
   */
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

  /**
   * JSX Return Statement
   * 
   * This section of the code renders the UI based on the user's sign-up status.
   * If the user is signed up, it displays a success message.
   * Otherwise, it renders a sign-up form with fields for email, password, and password confirmation,
   * along with a Google login button.
   */
  return (
    <div>
      {isSignedUp ? (
        // Display success message if the user is signed up
        <h1>Account Created</h1>
      ) : (
        // Render the sign-up form if the user is not signed up
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