import { useState, useEffect, FC, SetStateAction } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface AsyncAutocompleteBooksInterface{
  setFoundBook: React.Dispatch<SetStateAction<{ 
    volumeID: string;
    title: string; 
    authors: string[]; 
    pickUpSpot: string; 
    isPublic: boolean;
    cover: string;
   }>>
}

interface book{
  value: string; 
  label: string;
  title: string;
  authors: string[]; 
  cover?: string;
}

export const AsyncAutocompleteBooks:FC<AsyncAutocompleteBooksInterface> = ({setFoundBook}) => {

    const [search, setSearch] = useState('')
    const [searchedBooks, setSearchedBooks] = useState<book[]>([{
        value: '', 
        label: '', 
        title: '', 
        authors: [''], 
        cover: ''
    }])

    const [titleChosen, setTitleChosen] = useState('')

    let books:book[]=[]

    useEffect(() => {
        const getBooks = () => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&key=AIzaSyDxOP0RY7OpFfbHIZHByQJDGV2Hfh9rV6o`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            data.items.map((item: any) => {
              if(item.volumeInfo.imageLinks){
                books.push({
                  value: item.id, 
                  label: `${item.volumeInfo.title} - ${item.volumeInfo.authors}`,
                  title: item.volumeInfo.title,
                  authors: item.volumeInfo.authors, 
                  cover: item.volumeInfo.imageLinks.thumbnail,
                })
              }else{
                books.push({
                  value: item.id, 
                  label: `${item.volumeInfo.title} - ${item.volumeInfo.authors}`,
                  title: item.volumeInfo.title,
                  authors: item.volumeInfo.authors,
                  cover: '' 
                })
              }
            })
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
        if(book.cover){
          setFoundBook({
          volumeID: book.value,
          title: book.title,
          authors: book.authors, 
          pickUpSpot: '', 
          isPublic: false,
          cover: book.cover, 
          }) 
        }else{
          setFoundBook({
          volumeID: book.value,
          title: book.title,
          authors: book.authors, 
          pickUpSpot: '', 
          isPublic: false, 
          cover: ''
          })
        }
      }
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if(e.currentTarget.value.length%5 == 0){
                setSearch(e.currentTarget.value)}}
              }
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
          )}
          />
    )
  }