import { useState, useEffect, FC, SetStateAction } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface AsyncAutocompleteBooksInterface{
  setFoundBook: React.Dispatch<SetStateAction<{ 
    volumeID: string;
    title: string; 
    authors: string[]; 
    cover?: string;
    pickUpSpot: string; 
    isPublic: boolean; }>>
}

export const AsyncAutocompleteBooks:FC<AsyncAutocompleteBooksInterface> = ({setFoundBook}) => {

    const [search, setSearch] = useState('')
    const [searchedBooks, setSearchedBooks] = useState([{
        value: '', 
        label: '', 
        title: '', 
        authors: '', 
        // cover: ''
    }])

    const [titleChosen, setTitleChosen] = useState('')

    let books = [{
      value: '',
      label: '', 
      title: '', 
      authors: '', 
      // cover: ''
        }]


    useEffect(() => {
        const getBooks = () => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&key=AIzaSyBcko7iJ6sXMEm-FWkvU6RI2rjEEXheOas&maxResults=10`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            data.items.map((item: any) => books.push({
              value: item.id, 
              label: `${item.volumeInfo.title} - ${item.volumeInfo.authors}`,
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors, 
              // cover: item.volumeInfo.imageLinks.thumbnail
            }))
            setSearchedBooks(books)
        })
        .catch((error) => {
            console.log(error);
        })
        }
        getBooks()
    },[search])   
    
    useEffect(() => {
      if (titleChosen !== ''){
        const book: any = searchedBooks.find((book) => book.label == titleChosen)
        setFoundBook({
          volumeID: book.value,
          title: book.title,
          authors: book.authors, 
          // cover: book.cover, 
          pickUpSpot: '', 
          isPublic: false
        })}
    }, [titleChosen])
   

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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSearch(e.currentTarget.value)}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
          )}
          />
    )
  }