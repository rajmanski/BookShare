import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router';



interface CardInterface{
    title: string;
    author: string;
    cover: string;
    volumeID: string;
}

export const NewInBookShareCardMobile:FC<CardInterface> = ({title, author, cover, volumeID}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  console.log(volumeID)


  return (
    <Card sx={{ width: '90vw', display: {xs: 'flex', md:'none'} }}>

        <CardMedia
        component="img"
        sx={{ width: 70, padding: '10px' }}
        image={cover}
        alt="book cover"
      />
      <CardActionArea>
      <CardContent sx={{ width: '60%', padding: '10px', flex: '1 0 auto' }}
          onClick={() => (
            console.log(volumeID),
            navigate(`/bookDetails/${volumeID}`))}>
          <Typography sx={{
            fontSize: '16px'
          }}component="div" variant="h5">
            {title}
          </Typography>
          <Typography sx={{
            fontSize: '14px'
          }}
           variant="subtitle1" color="text.secondary" component="div">
            {author}
          </Typography>
        </CardContent>
      <CardActions>
      <Button sx={{
            color: '#1976D2', 
            fontWeight: 400,
            textDecoration: 'toUpperCase', 
            position: 'absolute',
            bottom: 5, 
            right: 5
        }}
            size="small" 
            onClick={() => console.log('ok')}>
          BORROW
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}