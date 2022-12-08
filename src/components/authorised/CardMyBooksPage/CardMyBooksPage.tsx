import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface CardMyBooksPageProps{
  bookCover: string;
  bookTitle: string;
  bookAuthor: string;
} 


export const CardMyBooksPage = ({bookCover, bookTitle, bookAuthor}: CardMyBooksPageProps) => {
  return (
    <Card sx={{ 
        width: 204,
        minHeight: 295,
        boxShadow: '0px 0px 2px 0px rgba(66, 68, 90, 0.37)', 
        position: 'relative'
        }}>
      <CardActionArea>
        <CardMedia sx={{
            bgcolor:'#D9D9D9',
            objectFit:'contain', 
            padding: '10px',
        }}
          component="img"
          height="143"
          image={bookCover}
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
            {bookTitle}
          </Typography>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 13,
            fontWeight: 700, 
            // minHeight: 45  
          }}
            variant="h4" color="text.secondary">
           {bookAuthor}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{
            color: '#1976D2', 
            fontWeight: 700,
            textDecoration: 'toUpperCase', 
            position: 'absolute', 
            bottom: 5
        }}
            size="small" 
            color="primary">
          SHARE
        </Button>
      </CardActions>
    </Card>
  );
}
