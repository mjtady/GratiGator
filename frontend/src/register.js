import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  // Helper function to get the CSRF token
  function getCookies(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    console.log(getCookies('csrftoken'));
    return cookieValue;
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:8000/register/', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookies('csrftoken'),
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setUserId(data.user_id);
        setShowVerification(true);
      } else {
        setError(data.error || 'Failed to send verification code.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:8000/verify_email/', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookies('csrftoken'),
        },
        body: JSON.stringify({ user_id: userId, verification_code: verificationCode }),
      });

      const data = await response.json();
      if (data.success) {
        setIsVerified(true);
      } else {
        setError(data.error || 'Invalid verification code.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleFinalRegistration = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookies('csrftoken'),
        },
        body: JSON.stringify({
          user_id: userId,
          username,
          password,
          dob: birthDate,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Redirect to login or dashboard
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Failed to complete registration.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col bg-slate-900 items-center justify-center text-center">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      {!showVerification ? (
        <>
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
        </>
      ) : !isVerified ? (
        <div>
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
        <div>
          <h1 className="instrument-serif-regular font-bold text-4xl text-emerald-300 text-center">
            Enter your account details:
          </h1>
          <form onSubmit={handleFinalRegistration}>
            <div className="w-fit mt-4 text-left">
              <label className="text-white text-left">
                  Create your username</label>
              <div className='bg-slate-800 px-1 rounded-md mt-2 w-80 text-left flex items-center'>
                <span className="material-icons md-light m-1 md-18 py-1">
                  person</span>    
                <input 
                  className='px-2 bg-slate-800 text-white outline-none w-full'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='mt-2'>
                <label className="text-white text-left">
                    Create your password</label>
                <div className='bg-slate-800 px-1 rounded-md mt-2 w-80 text-left flex items-center'>
                  <span className="material-icons md-light m-1 md-18 py-1">
                    lock</span>    
                  <input 
                    type="password"
                    className='px-2 bg-slate-800 text-white outline-none w-full'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
            </div>
            <div className='mt-2'>
                <label className="text-white text-left">Confirm your password</label>
                <div className='bg-slate-800 px-1 rounded-md mt-2 w-80 text-left flex items-center'>
                  <span className="material-icons md-light m-1 md-18 py-1">lock</span>    
                  <input 
                    type="password"
                    className='px-2 bg-slate-800 text-white outline-none w-full'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
            </div>
            <div className='mt-2'>
                <label id="birthday" className="text-white text-left">
                  What is your birth date?
                </label>
                <div className='bg-slate-800 px-1 rounded-md mt-2 w-fit text-left flex items-center'>
                  <span className="material-icons md-light m-1 md-18 py-1">calendar_today</span>    
                  <input 
                    type="date"
                    className='px-2 bg-slate-800 text-white outline-none w-fit'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
            </div>
            <div className='text-center'>
                <button 
                  className="mt-5 p-1 px-8 bg-emerald-500 rounded-full text-slate-950 font-bold border-slate-950 border-2
                    hover:bg-slate-900 hover:border-emerald-500 hover:text-emerald-500 hover:transform hover:scale-110 hover:transition-all
                    active:bg-emerald-500 active:transition-all" 
                  type="submit"
                >
                  Create your account!
                </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;