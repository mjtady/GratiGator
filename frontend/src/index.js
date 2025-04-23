import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';

export default function Home(){
  return(
<div className="min-w-full min-h-screen bg-slate-900 text-white">
  {/* Navigation Bar */}
  <nav className="flex w-screen items-center justify-between px-8 py-4 bg-slate-950 shadow-md shadow-emerald-950 fixed">
    <h1 className="text-emerald-500 text-3xl instrument-serif-regular">Gratigator:</h1>
    <div className="space-x-6 text-lg">
      <a href="./login" className="hover:text-emerald-400 transition">Login</a>
      <a href="./register" className="hover:text-emerald-400 transition">Create an Account</a>
    </div>
  </nav>

  {/* Page Content: mostly just an explaination of what GratiGator is */}
  <div className="flex-1 text-center pt-10 items-center min-h-fit w-fit">
    <h2 className="inline-block text-emerald-500 text-6xl font-serif mt-28 instrument-serif-regular">Gratigator:</h2>
    <p className="inline-block text-4xl mt-5 pl-5 playpen-sans">a Gator's daily gratitude journal.</p>

    <div className="space-x-6 text-lg mt-5">
      <a href="./login" className="hover:text-emerald-400 transition playpen-sans">Login</a>
      <a href="./register" className="hover:text-emerald-400 transition playpen-sans">Create an Account</a>
    </div>


    <p className="inline-block text-lg mt-5 pl-5 text-left w-fit mx-56 p-5 bg-slate-800  pb-10">
    <h2 className="block text-emerald-500 text-4xl font-serif mt-5 instrument-serif-regular mb-5 text-left">About:</h2>

      GratiGator is a daily log-in based venting and gratiude journaling app for students at the 
      University of Florida. By logging entries daily, users are able to accumulate a daily 
      streak, and get rewarded on maintaining their journal on the daily. The goal of GratiGator is 
      to improve campus-wide mental health, reminding students that there are good things coming their 
      way admist some stressors and negativity.
      
  {/* team members credited */}


      <h2 className="block text-emerald-500 text-4xl font-serif mt-5 instrument-serif-regular mb-5 text-left">Team:
      </h2>
      
      <p>
      Anthony Le - UI/UX, Frontend
      </p>
      <p>
      Maria Juliana Tady - Fullstack
      </p>
      Edward Kempa - Backend
      </p>

  </div>
    {/* wrote a debug method to go into dashboard quicker to be able to view changes, since you can no longer enter without being logged in via login / registration */}

  <a href="./dashboard">
  <button className="hover:text-emerald-400 transition mt-56">Dashboard (debug)</button>
  </a>

</div>
    )
};

  {/* router to go to different pages */}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />


    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
