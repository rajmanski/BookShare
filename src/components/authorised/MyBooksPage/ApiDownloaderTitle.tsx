import React, {useState} from 'react';
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

export const ApiDownloaderTitle = () => {


    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const displaySearches = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:harry&printType=books&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`)
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                console.log(data.items[0].volumeInfo.title);
                setSearchedData(data.items)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    

    return (
        <div>

            <Paper sx={{
                minWidth: '560px', 
                display: 'flex',
                justifyContent: 'space-between', 
                padding: '10px'
            }}elevation={0} variant="outlined" square>
                
                <InputBase sx={{
                    fontSize: '18px', 
                    fontFamily: 'Roboto'
                }}placeholder="Search for a new book" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSearch(e.currentTarget.value)}/>
            
                <Button onClick={displaySearches} variant="contained" endIcon={<SearchIcon />}>
                Search
                </Button>
            </Paper>

            <div className="books">
                {searchedData.map((data:any, number:any) => (
                    <div className="card" key={number}>
                        {data.volumeInfo.title}
                    </div>
                ))}
            </div>
        </div>
    )
}