import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Car1 from "../assets/car1.jpg";
import { useState } from "react";
import { Modal, Paper, Chip, Grid } from "@mui/material";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CarCard = (props) => {
  console.log(props.img);
  const [email, setEmail] = useState(props.email);
  const [open, setOpen] = useState(false);
  const sendemail = (event) => {
    window.location.href = `mailto:${email}?subject=New%20Enquiry&body=Enter%20your%20details`;
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={5}>
      <Card
        sx={{
          maxHeight: 450,
          minHeight: 450,
          maxWidth: 350,
          minWidth: 350,
          backgroundColor: "#ebeae8",
        }}
      >
        <Grid container>
          <Grid item sm={12} md={12} lg={12} xl={12} sx={{ margin: "5px 0" }}>
            <Typography
              sx={{ textAlign: "center", color: "#6495ED" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              ${props.price}
            </Typography>
          </Grid>
        </Grid>
        <CardMedia
          component="img"
          alt="green iguana"
          image={props.img}
          onError={(e) => {
            e.target.src =
              "https://carimage5409.s3.amazonaws.com/alternate.jpeg";
          }}
          style={{
            maxHeight: 200,
            minHeight: 200,
            maxWidth: 500,
            minWidth: 300,
            objectFit: "",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            sx={{ textAlign: "left" }}
          >
            Model: {props.model}
          </Typography>
          <Typography
            gutterBottom
            variant="h9"
            component="div"
            sx={{ textAlign: "left" }}
          >
            Category: {props.category}
          </Typography>
          <Typography
            gutterBottom
            variant="h9"
            component="div"
            sx={{ textAlign: "left" }}
          >
            Description: {props.desc}
          </Typography>
          <Typography
            gutterBottom
            variant="h9"
            component="div"
            sx={{ textAlign: "left" }}
          >
            Owner: {props.ownername}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            sx={{ backgroundColor: "#1a1b1c" }}
            onClick={sendemail}
          >
            Email Owner
          </Button>
        </CardActions>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Email sent to the owner
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal> */}
      </Card>
    </Paper>
  );
};

export default CarCard;
