import { useState, useEffect, FC, SetStateAction } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getDocs, collection, getDoc, doc, DocumentData} from 'firebase/firestore';
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

        const [booksToBorrow, setBooksToBorrow] = useState({})

        const allOwnedBooksObjects: object[] = [] 


    useEffect(() => {
        const getAvailableBooks = async () => {
            const allOwnedBooksIDs: string[] = []
            const emails: string[] = [];
            const querySnapshot = await getDocs(collection(db, `users`));
            querySnapshot.forEach((doc) => {
              emails.push(doc.id);
            })
              emails.forEach(async (email) => {
                const querySnapshot = await getDocs(collection(db, `users/${email}/ownedBooks`));
                  querySnapshot.forEach((document) => {
                  allOwnedBooksIDs.push(document.id)
                })
                allOwnedBooksIDs.forEach(async (ID) => {
                  const querySnapshot = await getDoc(doc(db, `users/${email}/ownedBooks`, ID));
                  if(querySnapshot.data()?.isShared === true){
                  allOwnedBooksObjects.push(querySnapshot.data()?.volumeID)
                  console.log(allOwnedBooksObjects[0])
                  setBooksToBorrow(allOwnedBooksObjects)
                  }
                })
                    // booksToBorrow.forEach((bookID) => {
                    //     fetch(`https://www.googleapis.com/books/v1/volumes/${bookID}`)
                    //       .then((response) => response.json())
                    //       .then((data) => console.log(data))
                    // })
                })     
        }
        getAvailableBooks()
        // console.log(booksToBorrow)
    }, [search]);
    

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