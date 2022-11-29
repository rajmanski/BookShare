import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
  
    <div>
      <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      </Routes> 
    </div>
  
  );
}

export default App;
