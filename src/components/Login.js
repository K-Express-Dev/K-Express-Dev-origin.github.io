/**
 * Login Component
 * 
 * This component handles user login functionality, including email/password login
 * and Google login using Firebase Authentication. It also manages user session state.
 * 
 */
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Optionally, you can verify the token here
        setIsLoggedIn(true); // Update state to reflect the user is logged in
      }
    };
    checkUserLoggedIn();
  }, []);

  /**
   * Checks if an email exists in the Firestore database.
   * @param {string} email - The email to check.
   * @returns {boolean} - True if the email exists, false otherwise.
   */
  const checkEmailExists = async (email) => {
    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  /**
   * Handles the login process using email and password.
   */
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('token', await user.getIdToken());
      navigate('/'); // Redirect or update state to reflect the user is logged in
    } catch (error) {
      console.error('Login error', error.message);
      const emailExists = await checkEmailExists(email);
      console.log(emailExists ? 'Email exists in the database' : 'Email does not exist in the database');
    }
  };

  /**
   * Handles the login process using Google authentication.
   */
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('token', await user.getIdToken());
      navigate('/'); // Redirect or update state to reflect the user is logged in
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  /**
   * Logs the user out by removing the token from localStorage.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page or any other page
  };

  /**
   * Handles the form submission for login.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  if (isLoggedIn) {
    return (
      <div>
        <div>You are already logged in</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

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
        <button onClick={handleGoogleLogin}>Continue with Google</button>
      </div>
    </div>
  );
}

export default Login;