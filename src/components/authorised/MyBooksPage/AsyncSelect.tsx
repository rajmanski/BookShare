import { VolumeDown } from '@mui/icons-material';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';


export const MyAsyncSelect = () => {

    const [searchedBooks, setSearchedBooks] = useState([])

    const fetchBooks = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:harry&printType=books&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            console.log(data)
            setSearchedBooks(data.items[0].volumeInfo.title)
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <AsyncSelect
      loadOptions={fetchBooks} // function that executes HTTP request and returns array of options
      placeholder={"Select...."}
      defaultOptions // load on render
    //   defaultOptions={[id: 0, label: "Loading..."]} // uncomment this and comment out the line above to load on input change
    />
    )
  }