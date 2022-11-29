import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { MyBooksPage } from './components/authorised/MyBooksPage/MyBooksPage';
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage/LoginPage';

function App() {
  return (
  
    <div>
      <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/signup' element={<RegisterPage/>}></Route>
      <Route path='/mybooks' element={<MyBooksPage/>}></Route>
      <Route path='/singin' element={<LoginPage/>}/>
      </Routes> 
    </div>
  
  );
}

export default App;
