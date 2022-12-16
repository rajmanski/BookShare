import Box from '@mui/material/Box';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import "./RegisterPage.style.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import { Footer } from '../Footer/Footer'
import { NavBar } from '../shared/NavBar/NavBar'
import { useTheme } from '@mui/material/styles';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase'
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { PersistentDrawerLeft } from '../shared/NavBar/Drawer';
import { Link } from 'react-router-dom'


export const RegisterPage = () => {

  const navigate = useNavigate();

  const theme = useTheme();

  interface State {
        amount: string;
        password: string;
        weight: string;
        weightRange: string;
        showPassword: boolean;
        
      } 

  interface ConfState {
        amount: string;
        confPassword: string;
        weight: string;
        weightRange: string;
        showConfPassword: boolean;
  }

      

   const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    
  const [confValues, setConfValues] = useState<ConfState>({
      amount: '',
      confPassword: '',
      weight: '',
      weightRange: '',
      showConfPassword: false,
  });

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')


  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setPassword(event.target.value)
    };

  const handleChangeConf =
    (prop: keyof ConfState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfValues({ ...confValues, [prop]: event.target.value });
      setConfPassword(event.target.value)
    };
    
  const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

  const handleClickShowConfPassword = () => {
      setConfValues({
       ...confValues,
      showConfPassword: !confValues.showConfPassword,
      });
  };
    
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  const handleMouseDownConfPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };



    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.email)
          const email = userCredential.user.email;
          return email
        })
        .then((email) => setDoc(doc (db, "users", `${email}`), {
          email: `${email}`
        }))
        .then(() => navigate("/mybooks"))
        .catch((error) => {
          console.log(error.message);
        });
    }

   return (
    <div className='register-page-container'>
      <PersistentDrawerLeft/>
      <NavBar/>
    <div className='search-area'>

    <div className='register-form-container'>
        <div className='sign-up-title'><h2>Sign up</h2></div>

    <div className='register-form-inputs'>
    <Box
      component="form"
      sx={{ width: '30vw', padding:'0px' }}
      noValidate
      autoComplete="off">
    
      <TextField sx={{ width: '30vw'}}id="register-form-email" label="Email" variant="standard" className="register-page-input" onChange={(e) => setEmail(e.target.value)} />
      </Box>
        

      <FormControl fullWidth variant="standard"> 
      <InputLabel htmlFor="register-form-password">Password</InputLabel>
      <Input
            className="register-form-input"
            id="register-form-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            /> 
        </FormControl>    

        <FormControl fullWidth variant="standard"> 
      <InputLabel htmlFor="register-page-confirm-password">Confirm password</InputLabel>
      <Input
            className="register-form-input"
            id="register-form-confirm-password"
            type={confValues.showConfPassword ? 'text' : 'password'}
            value={confValues.confPassword}
            onChange={handleChangeConf('confPassword')}
            endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confPassword visibility"
                    onClick={handleClickShowConfPassword}
                    onMouseDown={handleMouseDownConfPassword}
                  >
                    {confValues.showConfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            /> 
        </FormControl>           
    </div>    

   
    
        <Button sx={{
          width: '30vw', 
          mb: '10px'
        }} onClick={handleSignUp} variant="contained">Sign up</Button>

        <Button sx={{
          width: '30vw'
        }}onClick={handleSignUp} variant="contained">Sign up with Google</Button>
        <div className='link-to-sign-in'>If you have an account, <Link to='/signin'>sign in.</Link></div>

    </div>

    <div className="images">
        <img
          className="first-book"
          src="jo.jpg"
          alt="Jo Nesbo book cover"
        />
        <img
          className="second-book"
          src="king.jpg"
          alt="Stephen King book cover"
          />
        <img
          className="third-book"
          src="harry.jpg"
          alt="Harry Potter book cover"
        />
    </div>
    </div>

    <Footer/>
     
    </div>
    
   )
}