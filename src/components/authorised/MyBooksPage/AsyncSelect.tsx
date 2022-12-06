import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export const AsyncAutocompleteBooks = ({setFoundBook}: any) => {

    const [search, setSearch] = useState('')
    const [searchedBooks, setSearchedBooks] = useState([{
        value: '', 
        label: '', 
        title: '', 
        subTitle: '', 
        authors: '', 
        cover: ''
    }])

    const [titleChosen, setTitleChosen] = useState('')

    let books = [{
      value: '',
      label: '', 
      title: '', 
      subTitle: '', 
      authors: '', 
      cover: ''
        }]


    useEffect(() => {
        const getBooks = () => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            data.items.map((item: any) => books.push({
              value: item.id, 
              label: `${item.volumeInfo.title} - ${item.volumeInfo.authors}`,
              title: item.volumeInfo.title,
              subTitle: item.volumeInfo.subtitle,
              authors: item.volumeInfo.authors, 
              cover: item.volumeInfo.imageLinks.thumbnail
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
          cover: book.cover
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