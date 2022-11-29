import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { Footer } from '../Footer/Footer'
import { useState } from 'react';

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
        <div className='login-page-container'>
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
    <Footer />
        </div>   
    )
}