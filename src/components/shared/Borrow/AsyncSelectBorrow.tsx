import { useState, useEffect, FC, SetStateAction } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

interface AsyncAutocompleteBooksInterface {
  setFoundBook: React.Dispatch<
    SetStateAction<{
      volumeID: string;
      title: string;
      authors: string[];
      pickUpSpot: string;
      isPublic: boolean;
      cover?: string;
    }>
  >;
}

export const AsyncSelectBorrow: FC<AsyncAutocompleteBooksInterface> = ({
  setFoundBook,
}) => {
  const [search, setSearch] = useState("");
  const [searchedBooks, setSearchedBooks] = useState<any>([]);

  const [titleChosen, setTitleChosen] = useState("");

  let books = [
    {
      value: "",
      label: "",
      title: "",
      authors: "",
      // cover: ''
    },
  ];

  const getBooksIds = async () => {
    const emails: string[] = [];
    const booksList: string[] = [];
    const querySnapshot = await getDocs(collection(db, `users`));
    querySnapshot.forEach((doc) => {
      emails.push(doc.id);
    });
    for (let i = 0; i < emails.length; i++) {
      const querySnapshot2 = await getDocs(
        query(collection(db, `users/${emails[i]}/ownedBooks`), where('isShared', '==', true))
      );
      querySnapshot2.forEach((doc) => {
        booksList.push(doc.data().volumeID);
      });
    }

    const getApiData = async () => {
      const responseList: any = [];
      for (let i = 0; i < booksList.length; i++) {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${booksList[i]}`
        );
        const data = await response.json();
        responseList.push(data);
      }
      setSearchedBooks(responseList.sort());
    };
    getApiData();
  };

  useEffect(() => {
    getBooksIds()
  }, []);



  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={searchedBooks.map((option) => option?.volumeInfo.title)}
      onChange={(event, value: any) => setTitleChosen(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a title you want to add"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            //   if(e.currentTarget.value.length%5 == 0){
            setSearch(e.currentTarget.value);
          }}
          //   }
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};
