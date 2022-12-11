import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'
import { useState } from 'react'

interface CardMyBooksPageProps{
  volumeID: string;
  bookCover: string | undefined;
  bookTitle: string;
  bookAuthor: string;
  setSharedBook: (value: string) => void;
} 


export const CardMyBooksPage = ({volumeID, bookCover, bookTitle, bookAuthor, setSharedBook}: CardMyBooksPageProps) => {

  const auth = getAuth()
  const email = auth.currentUser?.email

  const moveToSharedBooks = async (volumeID: string) => {
    await updateDoc(doc(db, `users/${email}/ownedBooks`,`${volumeID}`), {isShared: true})
    setSharedBook(volumeID)
  }

  if (bookCover === undefined){
    bookCover = 'nocover.png'
  }
  
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
            color="primary"
            onClick={() => moveToSharedBooks(volumeID)}>
          SHARE
        </Button>
      </CardActions>
    </Card>
  );
}
