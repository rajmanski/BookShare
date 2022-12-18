import { CardMedia, CardContent, CardActionArea, Typography, Card, CardActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react' 
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { getAuth } from 'firebase/auth'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'


interface CardMyBooksPageProps{
    volumeID: string;
    bookCover: string | undefined;
    bookTitle: string;
    bookAuthor: string;
    setSharedBook: any;
  } 

export const CardMyBookPageMobile:FC<CardMyBooksPageProps> = ({volumeID, bookCover, bookTitle, bookAuthor, setSharedBook}) => {

    if (bookCover === undefined){
        bookCover = 'nocover.png'
      }

    const navigate = useNavigate()

    const auth = getAuth()
    const email = auth.currentUser?.email

    const moveToSharedBooks = async (volumeID: string) => {
        await updateDoc(doc(db, `users/${email}/ownedBooks`,`${volumeID}`), {isShared: true})
        setSharedBook(current => !current)
      }

    const removeFromLibrary = async () => {
        await deleteDoc(doc(db, `users/${email}/ownedBooks`,`${volumeID}`))
        setSharedBook(current => !current)
        console.log('book removed')
      }

    return(
        <Card sx={{ width: '85vw', display: {xs: 'flex', md:'none'} }}>

        <CardMedia
        component="img"
        sx={{ width: 70, padding: '10px' }}
        image={bookCover}
        alt={bookTitle}
      />
      <CardActionArea>
      <CardContent sx={{ width: '70%', padding: '10px', flex: '1 0 auto' }}
        //  onClick={() => (
        //     navigate(`/bookDetails/${volumeID}`))} 
        >
          <Typography sx={{
            fontSize: '16px'
          }}component="div" variant="h5">
            {bookTitle}
          </Typography>
          <Typography sx={{
            fontSize: '14px'
          }}
           variant="subtitle1" color="text.secondary" component="div">
            {bookAuthor}
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
            onClick={() => moveToSharedBooks(volumeID)}>
          SHARE
        </Button>

        <Button sx={{
           position: 'absolute', 
           bottom: 5, 
           right: 60,
           color: '#1976D2' 

        }}
            size="small"
            onClick={() => removeFromLibrary()}
        >
        <DeleteOutlineIcon/>
        </Button>

      </CardActions>
      </CardActionArea>
    </Card>
    )
}