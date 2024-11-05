import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'; // Import jwt_decode to decode the Google token

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID

function Login({ onLoginSuccess }) {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Decode the token to get the user's profile information
    const profile = jwt_decode(response.credential); // Assuming response.credential contains the JWT token
    console.log('Decoded Profile:', profile);
    onLoginSuccess(profile); // Pass the decoded profile data to onLoginSuccess
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Login to Access EZTechMovie StreamList</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
