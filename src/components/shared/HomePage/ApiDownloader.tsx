import {useState} from 'react';

export const ApiDownloader = () => {

    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const displaySearches = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=40`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.items);
                setSearchedData(data.items)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    

    return (
        <div className="container">
            <h1>Search for a book</h1>
            <input type="text" onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={displaySearches}>Search</button>
            <div className="books">
                {searchedData.map((data: any, number:any) => (
                    <div className="card" key={number}>
                        {data.volumeInfo.title}
                    </div>
                ))}
            </div>
        </div>
    )
}