import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Rating, Typography } from "@mui/material"
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { auth, db } from "../../../firebase";
import { NewInBookShareCardMobile } from "./NewInBookShareCardMobile";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';


export const NewInBookshareCard = ({data, volumeIds, volumeMail, information, setDisplayBook}) => {

  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  const user = auth.currentUser;
  const email = user?.email

  let image = data.volumeInfo.imageLinks?.thumbnail;
  // const cleanText = data.description.replace(/<\/?[^>]+(>|$)/g, "");
  if (image === undefined) {
    image = 'nocover.png'
  }

  if (data.volumeInfo.description === undefined) {
    data.volumeInfo.description = 'Description is not avaliable';
  }

  const  addMonths = (date = new Date()) => {
    date.setMonth(date.getMonth() + 1);
    return date;
  }

  const addBookToBorrowed = async () => {
    const ownerEmail = information.email;
    
    // for (let i = 0; i < information.length; i++) {
    //   if (information[i]['volumeID'] === volumeIds) {
    //     ownerEmail = information[i].email;
    //   } 
    // }

    //Adding book to firebase borrowedBooks
    await setDoc(doc(db, `users/${email}/borrowedBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      originalOwner: ownerEmail,
      street: information.street,
      city: information.city,
      latitude: information.latitude,
      longitude: information.longitude,
      })
    
    //Deleting book from owner
    await deleteDoc(doc(db, `/users/${ownerEmail}/ownedBooks/${volumeIds}`))

    //Seting book a book lended book by the owner
    await setDoc(doc(db, `users/${email}/lendBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      Borrower: email,
      street: information.street,
      city: information.city,
      latitude: information.latitude,
      longitude: information.longitude,
      })
      handleOpenPopup();
      setDisplayBook(current => !current);
  }

const style = {
        width: "800px",
        height: "600px",
        position: "absolute",
        left: "calc(50% - 400px)",
        top: "15%",
        backgroundColor: "white",
        margin: "20px",
        padding: "20px",
        border: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        borderColor: "white",
        borderRadius: "6px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        outline: '0',
    };


    return (
        <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-data">
              <h5>Avaliable from: 4 Dec 2022</h5>
              <h5>Pick-up spot: {`${information.street}, ${information.city}`}</h5>
            </div>
            <div className="title-and-author">
              <Typography id="modal-modal-title" variant="h4" component="h2">
              {data.volumeInfo.title}
              </Typography>
              <h5>{data.volumeInfo.authors[0]}</h5>
            </div>
            <Typography
              id="modal-modal-description "
              sx={{ mt: 2, color: "gray", overflow: "auto", textOverflow: "ellipsis"}}
            >
              {data.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "")}
            </Typography>
            <div className="raiting-and-button">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  gap: "550px",
                }}
              >
                <Rating name="simple-controlled" value={data.volumeInfo.averageRating} />
                <Button
                  sx={{
                    bgcolor: "#18a86e",
                    "&:hover": { backgroundColor: "#405d27" },
                  }}
                  variant="contained"
                  onClick={addBookToBorrowed}
                >
                  Borrow
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>


        <NewInBookShareCardMobile title={data.volumeInfo.title} author={data.volumeInfo.authors[0]} cover={image} volumeID={data.id} information={information} setDisplayBook={setDisplayBook} volumeIds={volumeIds}/>

        <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Congratulations, you've borrowed a new book!"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <strong>{data.volumeInfo.title}</strong> seems like a good book, hopefully you'll enjoy it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Ok</Button>
        </DialogActions>
      </Dialog>


      <Card sx={{ 
        width: '345px',
        minHeight: '550px',
        boxShadow: '0px 0px 2px 0px rgba(66, 68, 90, 0.37)', 
        position: 'relative',
        display: {xs:'none', md:'block'}
        }}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia sx={{
            objectFit:'contain', 
            padding: '10px',
        }}
          component="img"
          height="300px"
          image={image}
          alt={data.volumeInfo.title}
        />
        <CardContent>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 28,
            fontWeight: 400 
          }}
            gutterBottom variant="h5" 
            component="p">
            {data.volumeInfo.title}
          </Typography>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 20,
            mt: '20px',
            fontWeight: 400, 
            // minHeight: 45  
          }}
            variant="h4" color="text.secondary">
           {data.volumeInfo.authors[0]}
          </Typography>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 18,
            mt: '20px',
            fontWeight: 400, 
            color: '#5BC49C'
          }}
            variant="h4" color="text.secondary">
           {information.city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{
            color: '#1976D2', 
            fontWeight: 400,
            textDecoration: 'toUpperCase', 
            position: 'absolute', 
            bottom: 5

        }}
            size="small" 
            color="primary"
            onClick={addBookToBorrowed}>
          BORROW
        </Button>
        <Button sx={{
           position: 'absolute', 
           bottom: 5, 
           right: 5,
           color: '#1976D2' 

        }}
            size="small"
            onClick={handleOpen}>
            DETAILS
        </Button>
      </CardActions>
    </Card>

      </> 
    )
}

