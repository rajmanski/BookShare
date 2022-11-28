import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import "./RegisterPage.style.css"


export const RegisterPage = () => {

    interface State {
        amount: string;
        password: string;
        weight: string;
        weightRange: string;
        showPassword: boolean;} 

    const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });     

    const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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
    <div className='register-page-container'>
        <h2>Sing up</h2>

    <div className='register-page-inputs'>
    <Box
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '415px' },}}
      noValidate
      autoComplete="off">
    
      <TextField id="register-page-emial" label="Email" variant="standard" className="register-page-input" />
      </Box>
        

      <FormControl fullWidth sx={{ m: 1 }} variant="standard"> 
      <InputLabel htmlFor="register-page-password">Password</InputLabel>
      <Input
            className="register-page-input"
            id="register-page-password"
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
            className="register-page-input"
            id="register-page-confirm-password"
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
    </div>    

    <div className='register-page-buttons'>
        <button>SING UP</button>
        <p>OR</p>
        <button>SING UP WITH GOOGLE</button>
        <p>If you have account, sing in.</p>
    </div>


     
    </div>
    
   )
}