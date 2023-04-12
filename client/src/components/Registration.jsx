import * as React from "react";
import { useState } from "react";
import { Typography, Modal, Box } from "@mui/material";
import styled from "styled-components";
import RegisterImage from "../assets/Register.jpg";

import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { margin } from "@mui/system";

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

const Register = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");

  const successMessage = () => {
    alert("Registered Successful");
  };

  const handleSubscription = () => {
    setOpen(false);
    axios
      .post(`${process.env.REACT_APP_BACKEND_IP}/awsbackend/subscribe`, {
        email: email,
      })
      .then(function (response) {
        console.log("response from node (subscribe)" + response.data.message);
        alert("Subscription email has been successfully sent ");
        alert("Registered Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSignin = () => {
    navigate("/");
  };

  const handleRegister = () => {
    console.log("username " + username);
    console.log("password " + password);
    console.log("cpassword" + cpassword);

    axios
      .post(`${process.env.REACT_APP_BACKEND_IP}/awsbackend/register`, {
        email: email,
        username: username,
        pwd: password,
      })
      .then(function (response) {
        console.log("response from node " + response.data.message);
        handleOpen();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <StyledLoginImgWrapper className="login-img-wrapper">
      <form className="login-form" method="post" enctype="multipart/form-data">
        <Typography className="title" variant="h2" paddingBottom={5}>
          Sign Up
        </Typography>
        <TextField
          className="input"
          required
          id="outlined-required"
          label="Username"
          defaultValue="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          className="input"
          required
          id="outlined-required"
          label="Email"
          defaultValue="email id"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          className="input"
          id="outlined-required"
          type="password"
          label="Password"
          defaultValue="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          required
          className="input"
          id="outlined-required"
          type="password"
          label="Confirm Password"
          defaultValue="Re-Enter Password"
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#3d7ab8" }}
          onClick={handleSignin}
        >
          Already a registered user? Sign in here
        </Button>
      </form>
      <div className="login-img">
        <img src={RegisterImage} alt="" />
      </div>
      <Modal open={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Would you like to subscribe to get updates about car listings
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubscription}
            sx={{ margin: "0 auto" }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                alert("Registered Successfully");
              }, 500);
            }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </StyledLoginImgWrapper>
  );
};

const StyledLoginImgWrapper = styled.div`
  display: flex;
  .p-button {
    background: #1e69ba;
    color: white;

    :hover {
      background: #1e69ba;
      color: white;
    }
  }

  .button {
    background-color: #d65611;
  }

  .input {
    :hover {
      box-shadow: 1px 1px 2px 1px #1e69ba;
    }
  }

  .title {
    color: #1e69ba;
  }

  .form-text {
    color: #1e69ba;
  }
  /* flex-wrap: wrap; */
  :hover {
    box-shadow: 1px 1px 2px 1px #1e69ba;
  }

  box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
  width: 70%;
  margin: 2rem auto;
  padding: 2rem;
  gap: 1rem;
  .login-form {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    .input-wrapper {
      text-align: left;
      input {
        width: 100%;
        padding: 0.6rem;
        border-radius: 5px;
        border: none;
        box-shadow: 0px 0px 1px 1px rgb(193, 193, 193);

        :hover {
          box-shadow: 0px 0px 1px 1px #1e69ba;
        }
      }
    }
  }
  .login-img {
    flex-basis: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media only screen and (min-width: 280px) and (max-width: 432px) {
    width: 100%;
    box-shadow: none;
    padding: 1rem;
    h2 {
      font-size: 2rem;
    }
    .login-form {
      flex-basis: 100%;
    }
    .login-img {
      display: none;
    }
  }
  @media only screen and (min-width: 432px) and (max-width: 1120px) {
    .login-form {
      flex-basis: 100%;
    }
    .login-img {
      display: none;
    }
  }
`;
export default Register;
