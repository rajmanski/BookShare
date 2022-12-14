import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./Borrow.style.css";
import {  useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { auth, db } from "../../../firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

export const BorrowedBookCard = ({ data, information, volumeIds, setDisplayBook}) => {
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
    alignItems: "flex-start",
    gap: "20px",
    borderColor: "white",
    borderRadius: "6px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    outline: "0",
  };

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

  return (
    <div className="borrowed-book-card">
      <div className="top-section">
        <div className="background">
          <div className="img">
            <img src={image} alt="Book Cover" />
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="book-data">
          <div className="title">
            <strong>{data.title}</strong>
          </div>
          {/* <div className="owner">Owner: {information?.originalOwner}</div> */}
          <div className="return-date">
            Return by: <span>{`${information?.dateOfReturn.toDate().toDateString().split(" ")[1]}, ${information?.dateOfReturn.toDate().toDateString().split(" ")[2]}, ${information?.dateOfReturn.toDate().toDateString().split(" ")[3]}`}</span>
          </div>
        </div>
        <div className="borrowed-book-card-buttons">
          <Button sx={{ color: "#1976D2" }} onClick={returnBook}>
            Return
          </Button>
          <Button sx={{ color: "#1976D2" }} onClick={prolong}>Prolong</Button>
          <LocationOnOutlinedIcon
            onClick={handleOpen}
            sx={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="map-title">
            <p>Pickup Spot: {`${information?.street}, ${information?.city}`}</p>
          </div>
          <div className="map" id="map">
            <MapContainer
              className="map"
              center={[information?.latitude, information?.longitude]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[information?.latitude, information?.longitude]}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>Pickup spot: {`${information?.street}, ${information?.city}`}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </Box>
      </Modal>
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"It seems that you want to return this book!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Hopefully
            that was a good book, and you've really enjoyed it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPopupProlong}
        onClose={handleClosePopupProlong}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"I see, it seems that you need more time to read this book!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Hopefully
            <strong> {data.title} </strong>will be a great book and you'll enjoy it!<br></br>
            You have one more month to read it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopupProlong}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
