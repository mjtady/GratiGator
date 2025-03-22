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
    <div> 
      <p>Gratigator</p>
      <a href="./login" >Login </a>
      <p>
      <a href="./register"> create an account</a>
      </p>
      <p>
      <a href="./dashboard"> dashboard</a>
      </p>
    </div>  
    )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />


    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
