import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React, {useEffect, useState} from 'react'

interface AutocompleteOption {
    label: string, 
    volumeID: number
  }

export const AutoComplete = () => {

    const SearchResults = [{label: "Harry Potter", volumeID: 1}, {label: "Shawshank", volumeID: 2}]

    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

        useEffect(() => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((error) => {
                console.log(error);
            })
        }, []) 
    

return (

    <Autocomplete
  multiple
  id="combo-box-demo"
  options={searchedData}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Title"/>}
/>

)
}