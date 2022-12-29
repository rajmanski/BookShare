import './App.css';
import { HomePage } from './components/shared/HomePage/HomePage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { MyBooksPage } from './components/authorised/MyBooksPage/MyBooksPage';
import { BookDetailsMobile } from './components/shared/BookDetailsMobile/BookDetailsMobile';
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Borrow } from './components/shared/Borrow/Borrow';
import { Lend } from './components/shared/Lend/Lend';

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
          <Route path='/' element={<HomePage/>}/>
          <Route path='/mybooks' element={<MyBooksPage/>}/>
          <Route path='/signin' element={<LoginPage/>}/>
          <Route path='/signup' element={<RegisterPage/>}/>
          <Route path='/borrow' element={<Borrow/>}/>
          <Route path='/lend' element={<Lend/>}/>
          <Route path='/bookdetails/:volumeID' element={<BookDetailsMobile/>}/>
        </Routes> 
      </div>
    </ThemeProvider>
  );
}

export default App;
