import { Box, Button, Modal, Rating, Typography } from "@mui/material"
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const NewInBookshareCard = ({data}) => {

const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let image = data.imageLinks?.thumbnail;
  if (image === undefined) {
    image = 'nocover.png'
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
                Shantaram
              </Typography>
              <h5>Gregory D. Roberts</h5>
            </div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "gray" }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
              aperiam fugiat illum, iste facere nesciunt nihil officiis earum
              ratione itaque, suscipit corporis inventore? Inventore maxime sit
              eum tenetur minus quidem adipisci dicta dolores! Earum, delectus.
              Possimus distinctio quis velit, sapiente, laudantium sequi amet,
              incidunt minima eum necessitatibus eius perspiciatis optio! Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. A aliquid sit
              obcaecati commodi, repudiandae sunt animi assumenda, placeat
              tempore dolores magni quia quisquam minus rerum! Ipsam, molestias.
              Omnis et nihil eos, vitae soluta nam deleniti saepe repellendus
              quia cum dolore amet tenetur delectus, dolorum inventore error
              totam eius, placeat ipsa!
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
        <div className="card-on-homepage" onClick={handleOpen}>
        <div className="img-card-wrapper">
          <img src={image} alt={data.title} />
        </div>
        <div className="title-and-area">
          <h3>{data.title}</h3>
          <h4>Żoliborz</h4>
        </div>
        <div className="author">{data.authors[0]}</div>
        <div className="buttons">
          <Button variant="text" size="small" sx={{ color: "blue" }}>
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