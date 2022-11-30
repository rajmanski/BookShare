import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import cover from '../../../images/book1.jpeg'


export const CardMyBooksPage= () => {
  return (
    <Card sx={{ 
        maxWidth: 204,
        boxShadow: '0px 0px 2px 0px rgba(66, 68, 90, 0.37)'
        }}>
      <CardActionArea>
        <CardMedia sx={{
            bgcolor:'#D9D9D9',
            objectFit:'contain', 
            padding: '10px',
        }}
          component="img"
          height="143"
          image={cover}
          alt="shantaram"
        />
        <CardContent>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16,
            fontWeight: 700 
          }}
            gutterBottom variant="h2" 
            component="div">
            Atomic habits
          </Typography>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 13,
            fontWeight: 700 
          }}
            variant="h4" color="text.secondary">
           James Clear
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{
            color: '#1976D2', 
            fontWeight: 700,
            textDecoration: 'toUpperCase'
        }}
            size="small" color="primary">
          SHARE
        </Button>
      </CardActions>
    </Card>
  );
}
