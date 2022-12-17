import { Drawer } from "@mui/material"
import { useFetch } from '../../useFetch'
import { useParams } from 'react-router-dom'
import { PersistentDrawerLeft } from "../NavBar/Drawer";

export const BookDetailsMobile = () => {
    
    const {bookTitle} = useParams();
    const {data: book, error, isLoading} = useFetch(`https://www.googleapis.com/books/v1/volumes/${bookTitle}`)


    return(
        <div>
            <PersistentDrawerLeft/>
            <div>
                <div>{book}</div>
                <div>Author</div>
                <div>Book details</div>
            </div>
            


        </div>


    )
}