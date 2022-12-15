import { Box, Button, Modal, Rating, Typography } from "@mui/material"
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { NewInBookShareCardMobile } from "./NewInBookShareCardMobile";

export const NewInBookshareCard = ({data, volumeIds, volumeMail}) => {

const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    console.log(email)
    console.log(volumeIds);
    let ownerEmail = '';

    //Adding book to firebase borrowedBooks
    await setDoc(doc(db, `users/${email}/borrowedBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      })
    console.log('Book added to Borrowed books')
    

    //Deleting book from owner from firebase
    for(let i = 0; i < volumeMail; i++) {
      for (let j = 0; j < volumeMail[i].length; j++) {
        if (volumeMail[i][j] === volumeIds) {
          console.log(volumeMail[i][j])
          ownerEmail = volumeMail[i][j];
        }
      }
    }

    console.log(ownerEmail);
    
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
                >
                  Borrow
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>

        <NewInBookShareCardMobile title={data.title} author={data.authors[0]} cover={image}/>

        
         <div className="card-on-homepage" onClick={handleOpen}>
        <div className="img-card-wrapper">
          <img className="cover" src={image} alt={data.title} />
        </div>
        <div className="title-and-area">
          <h3>{data.title}</h3>
          <h4>Żoliborz</h4>
        </div>
        <div className="author">{data.authors[0]}</div>
        <div className="buttons">
          <Button variant="text" size="small" sx={{ color: "blue" }} onClick={addBookToBorrowed}>
            BORROW
          </Button>
          <Button variant="text" size="small" sx={{ color: "blue" }}>
            DETAILS
          </Button>
          <FavoriteIcon sx={{ color: "gray" }} />
        </div>
        </div> 
      </> 
    )
}

