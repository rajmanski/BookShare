import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { RegisterPage } from './components/RegisterPage/RegisterPage';

function App() {
  return (
  
    <div>
      <HomePage /> 
      <Footer/>
      <RegisterPage />


      
    </div>
  
  );
}

export default App;
