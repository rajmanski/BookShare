import { useState, useEffect, FC, SetStateAction } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getDocs, collection, getDoc, doc, DocumentData, QuerySnapshot} from 'firebase/firestore';
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

interface BookToBorrow{
  city: string;
  email: string;
  isShared: boolean;
  latitude: number;
  longitude: number;
  street: string;
  volumeID: string;
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

        const [booksToBorrow, setBooksToBorrow] = useState<any>()

        const allOwnedBooksObjects: any[] = [] 
        
        useEffect(() => {

          const getEmails = async () => {
            const emails: string[] = [];
            const users = await getDocs(collection(db, `users`));
            users.forEach((user) => {
              emails.push(user.id);
            })
            return emails
          }

          const getOwnedBooksIds = async (email: string) => {
            const allOwnedBooksIds: string[] = []
            const querySnapshot = await getDocs(collection(db, `users/${email}/ownedBooks`));
            querySnapshot.forEach((book) => {
              allOwnedBooksIds.push(book.id)
            })
            // console.log(allOwnedBooksIds)
            return allOwnedBooksIds
          }

          const getBook = async (email: string, id:string) => {
            const bookDetails = await getDoc(doc(db, `users/${email}/ownedBooks`, id));
            // console.log(bookDetails.data())
            return bookDetails.data()
          }


          const getOwnedBooksDetails = async (email: string) => {
            const allOwnedBookDetails: any[] = []
            const allOwnedBooksIds = await getOwnedBooksIds(email)
            allOwnedBooksIds.forEach(async (id) => {
              const bookDetails = await getBook(email, id);
              if(bookDetails?.isShared === true){
                allOwnedBookDetails.push(bookDetails)
              }
            })
            console.log(allOwnedBookDetails)
            return allOwnedBookDetails
          }


          const getAllUsersBooksDetails = async () => {
            const allOwnedBooks: any[] = []
            const emails: string[] = await getEmails();
            emails.forEach(async (email) => {
              const userOwnedBooks = await getOwnedBooksDetails(email);
              allOwnedBooks.push(userOwnedBooks)
            })
            return allOwnedBooks
          }

          const a = getAllUsersBooksDetails()
          console.log(a)
      }, []);

      

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