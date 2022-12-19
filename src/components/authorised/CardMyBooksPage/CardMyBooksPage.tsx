import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Modal, TextField } from '@mui/material';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

interface CardMyBooksPageProps{
  volumeID: string;
  bookCover: string | undefined;
  bookTitle: string;
  bookAuthor: string;
  setSharedBook: any;
} 


export const CardMyBooksPage = ({volumeID, bookCover, bookTitle, bookAuthor, setSharedBook}: CardMyBooksPageProps) => {

  const auth = getAuth()
  const email = auth.currentUser?.email
  const [open, setOpen] = useState(false);
  const [latlng, setLatlng] = useState<any>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSharedBook(current => !current)
    console.log('SHARED!');
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

  const moveToSharedBooks = async (volumeID: string) => {
    await updateDoc(doc(db, `users/${email}/ownedBooks`,`${volumeID}`), {isShared: true})
    handleOpen();
  }

  const removeFromLibrary = async () => {
    await deleteDoc(doc(db, `users/${email}/ownedBooks`,`${volumeID}`))
    setSharedBook(current => !current)
    console.log('book removed')
  }

  if (bookCover === undefined){
    bookCover = 'nocover.png'
  }
  
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        setLatlng(e.latlng);
      },
    });
    return null;
}

  return (
    <>
    <Card sx={{ 
        width: 204,
        minHeight: 295,
        boxShadow: '0px 0px 2px 0px rgba(66, 68, 90, 0.37)', 
        position: 'relative',
        display: {xs:'none', md:'block'}
        }}>
      <CardActionArea>
        <CardMedia sx={{
            bgcolor:'#D9D9D9',
            objectFit:'contain', 
            padding: '10px',
        }}
          component="img"
          height="143"
          image={bookCover}
          alt="shantaram"
        />
        <CardContent>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16,
            fontWeight: 700 
          }}
            gutterBottom variant="h2" 
            component="div">
            {bookTitle}
          </Typography>
          <Typography sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 13,
            fontWeight: 700, 
            // minHeight: 45  
          }}
            variant="h4" color="text.secondary">
           {bookAuthor}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{
            color: '#1976D2', 
            fontWeight: 700,
            textDecoration: 'toUpperCase', 
            position: 'absolute', 
            bottom: 5
        }}
            size="small" 
            color="primary"
            onClick={() => moveToSharedBooks(volumeID)}>
          SHARE
        </Button>
        <Button sx={{
           position: 'absolute', 
           bottom: 5, 
           right: 5,
           color: '#1976D2' 

        }}
            size="small"
            onClick={() => removeFromLibrary()}
        >
        <DeleteOutlineIcon/>
        </Button>
      </CardActions>
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="map-title">
            <h3>Enter the pickup spot:</h3>
            <div className="map-inputs">
            <TextField id="outlined-search" label="Enter street name" type="text" />
            <TextField id="outlined-search" label="Enter city" type="text" />
            <Button variant="contained">Start Sharing!</Button>
            </div>
          </div>
          <div className="map" id="map">
            <h5>Mark on the map</h5>
            <MapContainer
              className="map"
              center={[52.23887604209378, 21.009906761293422]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {latlng && (
                <Marker
                position={[52.23887604209378, 21.009906761293422]}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>Pickup spot</Popup>
              </Marker>
              )}
              
              <MapEvents />
            </MapContainer>
          </div>
        </Box>
      </Modal>
    </>
  );
}
