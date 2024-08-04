import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function GoogleSignIn() {
  const handleSuccess = (credentialResponse) => {
    const details = jwt_decode(credentialResponse.credential);
    console.log(details);
    // Send the token to your backend
    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from your server
        console.log(data);
      });
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}