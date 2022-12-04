import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export const AsyncAutocompleteBooks = ({setTitle}: any) => {

    const [search, setSearch] = useState('')

    const [searchedBooks, setSearchedBooks] = useState([{
        value: '', 
        label: ''
    }])

    useEffect(() => {
        const getBooks = () => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            console.log(data.items)
            let books = [{value: '', label: ''}]
            data.items.map((item: any) => books.push({value: item.id, label: `${item.volumeInfo.title} - ${item.volumeInfo.authors}`}))
            setSearchedBooks(books)

        })
        .catch((error) => {
            console.log(error);
        })
        }
        getBooks()
    },[search])     

    return (
        <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={searchedBooks.map((option) => option.label)}
        onChange={(event, value) => (
          console.log(event),
          setTitle(value) 
        )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter title"
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