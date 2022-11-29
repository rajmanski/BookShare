import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { MyBooksPage } from './components/authorised/MyBooksPage/MyBooksPage';
import { Routes, Route } from 'react-router-dom'
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#18A86E',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signup' element={<RegisterPage/>}></Route>
        <Route path='/mybooks' element={<MyBooksPage/>}></Route>
        </Routes> 
      </div>
    </ThemeProvider>
  
  );
}

export default App;
