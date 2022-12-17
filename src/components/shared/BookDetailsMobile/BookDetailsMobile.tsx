import { useFetch } from '../../useFetch'
import { useParams } from 'react-router-dom'
import { PersistentDrawerLeft } from "../NavBar/Drawer";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Typography, Rating } from '@mui/material';

export const BookDetailsMobile = () => {
    
    const {volumeID} = useParams();
    const {data: book, error, isLoading} = useFetch(`https://www.googleapis.com/books/v1/volumes/${volumeID}`)
    const [bookToDisplay, setBookToDisplay] = useState<DocumentData | null>(null)
    const [cover, setCover] = useState<string | null>(null)

    
    useEffect(()=> {
        setBookToDisplay(book)
        console.log(bookToDisplay)
    },[isLoading])

    return(
        <div>
            <PersistentDrawerLeft/>

            {book && 
            <div> 
                <div>{bookToDisplay?.volumeInfo.title}</div>
                <div>{bookToDisplay?.volumeInfo.authors[0]}</div>
                {bookToDisplay?.volumeInfo.description && 
                    <div>{bookToDisplay?.volumeInfo.description}</div>
                }
                {!bookToDisplay?.volumeInfo.description && 
                    <div>Description is not available</div>
                }
                
                <Typography component="legend">Rating</Typography>
                <Rating name="read-only" defaultValue={bookToDisplay?.volumeInfo.averageRating} readOnly />
            </div>

                
            }
            
            


        </div>


    )
}