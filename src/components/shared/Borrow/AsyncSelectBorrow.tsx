import { useState, useEffect, FC, SetStateAction } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getDocs, collection } from 'firebase/firestore';
import {db} from '../../../firebase'

interface AsyncAutocompleteBooksInterface{
  setFoundBook: React.Dispatch<SetStateAction<{ 
    volumeID: string;
    title: string; 
    authors: string[]; 
    pickUpSpot: string; 
    isPublic: boolean; 
    cover?: string;
  }>>
}

export const AsyncSelectBorrow:FC<AsyncAutocompleteBooksInterface> = ({setFoundBook}) => {

    const [search, setSearch] = useState('')
    const [searchedBooks, setSearchedBooks] = useState([{
        value: '', 
        label: '', 
        title: '', 
        authors: '', 
        cover: ''
    }])

    const [titleChosen, setTitleChosen] = useState('')

    let books = [{
      value: '',
      label: '', 
      title: '', 
      authors: ''
      // cover: ''
        }]


    useEffect(() => {
        const getBooksIds = async () => {
            const emails: string[] = [];
            const booksList: string[] = [];
            const querySnapshot = await getDocs(collection(db, `users`));
            querySnapshot.forEach((doc) => {
              emails.push(doc.id);
              console.log(emails)
            })
        }
        getBooksIds()
    }, [search]);
    
    // useEffect(() => {
    //   if (titleChosen !== ''){
    //     const book: any = searchedBooks.find((book) => book.label == titleChosen)
    //     setFoundBook({
    //       volumeID: book.value,
    //       title: book.title,
    //       authors: book.authors, 
    //       // cover: book.cover, 
    //       pickUpSpot: '', 
    //       isPublic: false
    //     })}
    // }, [titleChosen])
   

    return (
        <Autocomplete
        freeSolo
        disableClearable
        options={searchedBooks.map((option) => option.label)}
        onChange={(event, value) => (
          setTitleChosen(value)
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a title you want to add"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            //   if(e.currentTarget.value.length%5 == 0){
                setSearch(e.currentTarget.value)}}
            //   }
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
          )}
          />
    )
  }