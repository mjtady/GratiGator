import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // New state for email sent
  const [verificationError, setVerificationError] = useState(''); // Error for verification
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Use the email from the state
    axios.post('http://127.0.0.1:8000/verification/send-verification-email/', {
      email: email,  // Use the state email instead of hardcoded one
    })
    .then((response) => {
      if (response.data.status === 'success') {
        setEmailSent(true);
        setShowVerification(true);  // Show verification input
      } else {
        console.error('Failed to send email');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    // Verify the entered verification code
    axios.post('http://127.0.0.1:8000/verification/verify-verification-code/', {
      email: email,
      verification_code: verificationCode,
    })
    .then((response) => {
      console.log(response);  // Log the response from the backend
      if (response.data.status === 'success') {
        setIsVerified(true);
        setVerificationError('');
      } else {
        setVerificationError('Invalid verification code. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error.response);  // Log full error response
      setVerificationError('There was an error verifying the code. Please try again.');
    });
  };

  const handleRegistrationSubmit = (e) => {
      e.preventDefault();

      axios.post('http://127.0.0.1:8000/verification/register-user/', {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);  // Log the response from the backend
        if (response.data.status === 'success') {
          setRegistrationSuccess(true);
          setRegistrationError('');
          navigate("/dashboard");

        } else {
          setRegistrationError(response.data.message || 'Registration failed.');
        }
      })
      .catch((error) => {
          if (error.response && error.response.data.error) {
            setRegistrationError(error.response.data.error);
          } else {
            setRegistrationError('There was an error creating your account.');
          }
        });
  };


  return (
    <div className="min-h-screen min-w-full flex flex-col bg-slate-900 items-center justify-center text-center">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      {!showVerification ? (
        <>
          {/* here, users submit their email to send a code to their email inbox */}

          <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300">
            Register an Account
          </h1>
          <form onSubmit={handleEmailSubmit}>
            <div className="w-96 mt-4 text-left">
              <label htmlFor="E-mail" className="text-white text-left mt-4">
                Enter your email
              </label>
            </div>
            <div className='bg-slate-800 px-1 rounded-md mt-1 w-full text-left flex items-center'>
              <span className="material-icons md-light m-1 md-18 py-1">mail</span>
              <input
                placeholder='your_email@ufl.edu'
                className='px-2 bg-slate-800 text-white outline-none w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <p className='text-white text-sm mt-3 w-96 text-left text-slate-400'>
              Gratigator is for University of Florida students only, using their @ufl.edu emails.
            </p>
            <button
              className="mt-5 p-1 px-8 bg-emerald-500 rounded-full text-slate-950 font-bold border-slate-950 border-2
                hover:bg-slate-900 hover:border-emerald-500 hover:text-emerald-500 hover:transform hover:scale-110 hover:transition-all
                active:bg-emerald-500 active:transition-all"
              type="submit"
            >
              Verify your e-mail
            </button>
            <p className='text-white text-sm mt-3'>
              Do you have a Gratigator account?
              <Link to="/login" className="text-emerald-500 text-sm underline"> Log-in</Link>
            </p>
          </form>
          {emailSent && <p className="text-white text-sm mt-3">Verification email sent!</p>} {/* Display confirmation */}
        </>
      ) : !isVerified ? (
        <div>
           {/* vertifying account ui */}
          <div className="w-80 mt-4 text-left">
            <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 text-center">
              Verify your email
            </h1>
            <label htmlFor="verification" className="text-white text-left mt-4">
              Enter verification code
            </label>
          </div>
          <form onSubmit={handleVerificationSubmit}>
            <div className='bg-slate-800 px-1 rounded-md mt-1 w-full text-left flex items-center'>
              <span className="material-icons md-light m-1 md-18 py-1">key</span>
              <input
                className='px-2 bg-slate-800 text-white outline-none w-full'
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                type="text"
                required
              />
            </div>
            {verificationError && <p className="text-red-500 mt-2">{verificationError}</p>} {/* Error message */}
            <button
              className="mt-5 p-1 px-8 bg-emerald-500 rounded-full text-slate-950 font-bold border-slate-950 border-2
                hover:bg-slate-900 hover:border-emerald-500 hover:text-emerald-500 hover:transform hover:scale-110 hover:transition-all
                active:bg-emerald-500 active:transition-all"
              type="submit"
            >
              Enter
            </button>
          </form>
        </div>
      
      ) : (

        <div className="flex flex-col items-center">
          {/* create user data/account after vertification */}

          <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 text-center mb-4">
            Enter your account details:
          </h1>
          <form onSubmit={handleRegistrationSubmit} className="flex flex-col items-center space-y-4 w-full">
            <div className="w-96 text-left">
              <label htmlFor="username" className="text-white">
                Create a username
              </label>
              <div className="bg-slate-800 px-1 rounded-md mt-1 w-full text-left flex items-center">
                <span className="material-icons md-light m-1 md-18 py-1">person</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose your username"
                  className="px-2 bg-slate-800 text-white outline-none w-full"
                  required
                />
              </div>
            </div>

            <div className="w-96 text-left">
              <label htmlFor="password" className="text-white">
                Create a password
              </label>
              <div className="bg-slate-800 px-1 rounded-md mt-1 w-full text-left flex items-center">
                <span className="material-icons md-light m-1 md-18 py-1">lock</span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password"
                  className="px-2 bg-slate-800 text-white outline-none w-full"
                  required
                />
              </div>
            </div>

            <div className="min-h-[20px] w-96 text-left">
              {registrationError && (
                <p className="text-red-500 text-sm mt-1 text-center w-full">
                  {registrationError}
                </p>
              )}
              {registrationSuccess && (
                <p className="text-green-500 text-sm mt-1 text-center w-full">
                  Registration successful!
                </p>
              )}
            </div>

            <button
              className="mt-2 p-1 px-8 bg-emerald-500 rounded-full text-slate-950 font-bold border-slate-950 border-2
                hover:bg-slate-900 hover:border-emerald-500 hover:text-emerald-500 hover:transform hover:scale-110 hover:transition-all
                active:bg-emerald-500 active:transition-all"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
