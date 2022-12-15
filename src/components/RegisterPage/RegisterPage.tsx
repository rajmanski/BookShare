import Box from '@mui/material/Box';
import React, { useReducer, useState } from 'react';
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
import { doc, setDoc, collection } from "firebase/firestore"; 
import { db } from '../../firebase'
import { Navigate, useNavigate } from 'react-router';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { PersistentDrawerLeft } from '../shared/NavBar/Drawer';


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

    const navigateToSingIn = () => {
      navigate("/signin")
    }

   return (
    <div className='register-page-container'>
      <PersistentDrawerLeft/>
      <NavBar/>

    <div className='register-form-container'>
        <h2>Sign up</h2>

    <div className='register-form-inputs'>
    <Box
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '415px' },}}
      noValidate
      autoComplete="off">
    
      <TextField id="register-form-email" label="Email" variant="standard" className="register-page-input" onChange={(e) => setEmail(e.target.value)} />
      </Box>
        

      <FormControl fullWidth sx={{ m: 1 }} variant="standard"> 
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

        <FormControl fullWidth sx={{ m: 1 }} variant="standard"> 
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

    <div className='register-form-buttons'>
        <Button onClick={handleSignUp} variant="contained">Sing up</Button>
        <p></p>
        <Divider> OR </Divider>
        <p></p>
        <Button onClick={handleSignUp} variant="contained">Sing up with google</Button>
        <p>If you have an account, <button onClick={navigateToSingIn} className='singin-text-button'>sing in.</button></p>
    </div>

    </div>

    <Footer/>
     
    </div>
    
   )
}