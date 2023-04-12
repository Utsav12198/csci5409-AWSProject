import * as React from "react";
import { useState } from "react";
import { Typography, Tooltip } from "@mui/material";
import styled from "styled-components";
import Loginimage from "../assets/Login.jpg";
import { useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleSignin = () => {
    console.log("username " + username);
    console.log("password " + password);
    console.log(process.env.REACT_APP_BACKEND_IP);

    axios
      .post(`${process.env.REACT_APP_BACKEND_IP}/awsbackend/login`, {
        username: username,
        pwd: password,
      })
      .then(function (response) {
        console.log("response from node " + response.data.message);
        if (response.data.message === "Success") {
          navigate("/viewcar");
        } else {
          console.log(response.data.message);
          alert("Invalid credentials");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <StyledLoginImgWrapper className="login-img-wrapper">
      <form className="login-form" method="post" enctype="multipart/form-data">
        <Typography variant="h2" paddingBottom={5}>
          Login
        </Typography>
        <TextField
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
          required
          id="outlined-required"
          type="password"
          label="Password"
          defaultValue="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSignin}>
          Sign in
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#3d7ab8" }}
          onClick={handleRegister}
        >
          Done have an account? Register here
        </Button>
      </form>
      <div className="login-img">
        <img src={Loginimage} alt="" />
      </div>
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
export default Login;
