/**
 * SignUp Component
 * 
 * This component handles user sign-up functionality, including email/password sign-up
 * and Google sign-up using Firebase Authentication. It also saves user data to Firestore.
 * 
 */

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  /**
   * Saves user data to Firestore.
   * @param {Object} user - The user object from Firebase Authentication.
   */
  const saveUserToFirestore = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        // Add any additional fields you want to store
      });
      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Error saving user data to Firestore:", error);
      throw error;
    }
  };

  /**
   * Checks if an email already exists in the Firestore database.
   * @param {string} email - The email to check.
   * @returns {boolean} - True if the email exists, false otherwise.
   */
  const checkEmailExists = async (email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  /**
   * Handles the form submission for email/password sign-up.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError('An account with this email already exists');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(userCredential.user);
      setAccountCreated(true);
      setTimeout(() => navigate('/'), 3000); // Delay navigation by 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Handles the Google sign-up process.
   */
  const handleGoogleSignUp = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const emailExists = await checkEmailExists(result.user.email);
      if (emailExists) {
        setError('An account with this email already exists');
        return;
      }
      await saveUserToFirestore(result.user);
      setAccountCreated(true);
      setTimeout(() => navigate('/'), 3000); // Delay navigation by 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Renders the sign-up form.
   * @returns {JSX.Element} - The sign-up form.
   */
  const renderForm = () => (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
    </>
  );

  /**
   * Renders a success message after account creation.
   * @returns {JSX.Element} - The success message.
   */
  const renderSuccessMessage = () => (
    <div>
      <h1>Account successfully created!</h1>
      <h2>You can now log into this account.</h2>
      <h3>
        <span className="spinner" />
        Redirecting to home page...
      </h3>
    </div>
  );

  return (
    <div>
      {accountCreated ? renderSuccessMessage() : renderForm()}
    </div>
  );
}

export default SignUp;