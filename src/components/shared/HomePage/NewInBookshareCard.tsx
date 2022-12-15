import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Rating, Typography } from "@mui/material"
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { auth, db } from "../../../firebase";
import { NewInBookShareCardMobile } from "./NewInBookShareCardMobile";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export const NewInBookshareCard = ({data, volumeIds, volumeMail, information}) => {

  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  const user = auth.currentUser;
  const email = user?.email
  
  
  
  

  let image = data.imageLinks?.thumbnail;
  // const cleanText = data.description.replace(/<\/?[^>]+(>|$)/g, "");
  if (image === undefined) {
    image = 'nocover.png'
  }

  if (data.description === undefined) {
    data.description = 'Description is not avaliable';
  }

  const  addMonths = (date = new Date()) => {
    date.setMonth(date.getMonth() + 1);
    return date;
  }

  const addBookToBorrowed = async () => {
    let ownerEmail = '';
    
    for (let i = 0; i < information.length; i++) {
      if (information[i]['volumeID'] === volumeIds) {
        ownerEmail = information[i].email;
      } 
    }

    //Adding book to firebase borrowedBooks
    await setDoc(doc(db, `users/${email}/borrowedBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      originalOwner: ownerEmail,
      })
    
    //Deleting book from owner
    await deleteDoc(doc(db, `/users/${ownerEmail}/ownedBooks/${volumeIds}`))

    //Seting book a book lended book by the owner
    await setDoc(doc(db, `users/${email}/lendBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      Borrower: email,
      })
      handleOpenPopup();
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
              <h5>Owner: Piotrek</h5>
              <h5>Avaliable from: 4 Dec 2022</h5>
              <h5>Pick-up spot: ul. Jana Pawła II 28/32</h5>
            </div>
            <div className="title-and-author">
              <Typography id="modal-modal-title" variant="h4" component="h2">
              {data.title}
              </Typography>
              <h5>{data.authors[0]}</h5>
            </div>
            <Typography
              id="modal-modal-description "
              sx={{ mt: 2, color: "gray", overflow: "auto", textOverflow: "ellipsis"}}
            >
              {data.description?.replace(/<\/?[^>]+(>|$)/g, "")}
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
                <Rating name="simple-controlled" value={2} />
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


        <NewInBookShareCardMobile title={data.title} author={data.authors[0]} cover={image}/>

        <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Congratulations, you've borrowed a book!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <strong>{data.title}</strong> seems like a good book, hopefully you'll enjoy it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Ok</Button>
        </DialogActions>
      </Dialog>
        <div className="card-on-homepage">
        <div className="img-card-wrapper">
          <img src={image} alt={data.title}  onClick={handleOpen}/>

        </div>
        <div className="title-and-area">
          <h3>{data.title}</h3>
          <h4>Żoliborz</h4>
        </div>
        <div className="author">{data.authors[0]}</div>
        <div className="buttons">
          <Button variant="text" size="small" sx={{ color: "blue" }} onClick={addBookToBorrowed} >
            BORROW
          </Button>
          <Button variant="text" size="small" sx={{ color: "blue" }}  onClick={handleOpen}>
            DETAILS
          </Button>
          <FavoriteIcon sx={{ color: "gray" }} />
        </div>
        </div> 
      </> 
    )
}

