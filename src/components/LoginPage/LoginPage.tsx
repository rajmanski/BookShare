import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { Footer } from '../Footer/Footer'
import { useState } from 'react';
import { NavBar } from '../shared/NavBar/NavBar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import "./LoginPage.style.css"
import { PersistentDrawerLeft } from '../shared/NavBar/Drawer';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'


export const LoginPage = () => { 

    interface State {
        amount: string;
        password: string;
        weight: string;
        weightRange: string;
        showPassword: boolean;        
    }

    const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

const handleSignIn = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    navigate('/mybooks')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
    
    const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setPassword(event.target.value)
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
  <div>
      <PersistentDrawerLeft/>
      <NavBar/>
        <div className='search-area'>

           <div className='login-page-panel'>
            <div className='sign-up-title'><h2>Sign in</h2></div>

            <FormControl fullWidth variant='standard'>
              <InputLabel htmlFor="register-form-email">Email</InputLabel>
              <Input
                className="register-form-email"
                id="register-form-email"
                onChange={(e) => setEmail(e.target.value)}
                /> 
            </FormControl>

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

            <Button sx={{
              width: '100%', 
              mt: '30px',
              mb: '10px'
            }}
              onClick={handleSignIn} variant="contained">
              Sing in
            </Button>

            <div className="link-to-sign-up">If you don't have an account yet, <Link to='/signup'>sign up.</Link></div>
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
    <Footer />
  </div>   
    )
}