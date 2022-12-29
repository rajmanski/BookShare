import { CardMedia, CardContent, CardActionArea, Typography, Card, CardActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react' 
import { updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./Borrow.style.css";
import {  useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { auth, db } from "../../../firebase";

export const BorrowedBookCardMobile = ({ data, information, volumeIds, setDisplayBook}) => {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupProlong, setOpenPopupProlog] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);
  const handleClosePopupProlong = () => setOpenPopupProlog(false);
  const user = auth.currentUser;
  const email = user?.email;

  let image = data.imageLinks?.thumbnail;
  if (image === undefined) {
    image = "nocover.png";
  }
  if (data.title.length > 45) {
    data.title = data.title.slice(0, 45) + "...";
  }


  const  addMonths = (date = new Date()) => {
    date.setMonth(date.getMonth() + 1);
    return date;
  }

  const returnBook = async () => {
    //adding doc in owner ownedbooks
    await setDoc(
      doc(db, `users/${information?.originalOwner}/ownedBooks`, `${volumeIds}`),
      {
        volumeID: volumeIds,
        isShared: false,
        email: information?.originalOwner,
      }
    );

    //deleting doc from lendBooks by owner
    await deleteDoc(
      doc(db, `/users/${information?.originalOwner}/lendBooks/${volumeIds}`)
    );

    //deleting docs from borrowedBooks by borrower
    await deleteDoc(doc(db, `/users/${email}/borrowedBooks/${volumeIds}`));

    console.log(`${volumeIds} deleted.`);
    handleOpenPopup();
    setDisplayBook(current => !current)
  };

  //function that is changing borrow time for one more month
  const prolong = async () => {
    await updateDoc(
      doc(db, `/users/${email}/borrowedBooks/${volumeIds}`),
      {
        dateOfReturn: addMonths(),
      }
    );
    console.log('Prolonged.')
    setOpenPopupProlog(true);
    setDisplayBook(current => !current)
  }

    return(
        <Card sx={{ width: '90vw', display: {xs: 'flex', md:'none'} }}>

        <CardMedia
        component="img"
        sx={{ width: 70, padding: '10px' }}
        image={image}
        alt={data.title}
      />
      <CardActionArea>
      <CardContent sx={{ width: '70%', padding: '10px', flex: '1 0 auto' }}
        //  onClick={() => (
        //     navigate(`/bookDetails/${volumeID}`))} 
        >
          <Typography sx={{
            fontSize: '16px'
          }}component="p" variant="h5">
            {data.title}
          </Typography>
          <Typography sx={{
            fontSize: '14px'
          }}
           variant="subtitle1" color="text.secondary" component="p">
            {data.authors[0]}
          </Typography>
        </CardContent>
      <CardActions>
      <Button sx={{
            color: '#1976D2', 
            fontWeight: 400,
            textDecoration: 'toUpperCase', 
            position: 'absolute',
            bottom: 5, 
            right: 5
        }}
            size="small" 
            onClick={returnBook}
            >
          RETURN
        </Button>

        <Button sx={{
           position: 'absolute', 
           bottom: 5, 
           right: 60,
           color: '#1976D2', 
           mr: '10px', 
           fontWeight: 400,

        }}
            size="small"
            onClick={prolong}
        >
        PROLONG
        </Button>

      </CardActions>
      </CardActionArea>
    </Card>
    )
}