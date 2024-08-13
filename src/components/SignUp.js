import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(userCredential.user);
      setAccountCreated(true);
      setTimeout(() => navigate('/'), 3000); // Delay navigation by 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      setAccountCreated(true);
      setTimeout(() => navigate('/'), 3000); // Delay navigation by 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {accountCreated ? (
        <div>
          <h1>Account successfully created!</h1>
          <h2>You can now log into this account.</h2>
          <h3>
            <span className="spinner" />
            Redirecting to home page...
          </h3>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default SignUp;