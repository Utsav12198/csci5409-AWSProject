import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [flag, setFlag] = useState(true);
  const [ferrormsg, setFerrormsg] = useState("");
  const [lerrormsg, setLerrormsg] = useState("");
  const [emailerrormsg, setEmailerrormsg] = useState("");
  const [lengtherror, setLengtherror] = useState("");
  const [mismatcherror, setMismatcherror] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const navigate = useNavigate();

  const handleValidation = (event) => {
    event.preventDefault();

    if (!fnameValidation()) {
      setFerrormsg("Field should contain only alphabets");
    } else {
      setFerrormsg("");
    }

    if (!lnameValidation()) {
      setLerrormsg("Field should contain only alphabets");
    } else {
      setLerrormsg("");
    }

    if (!emailValidation()) {
      setEmailerrormsg("Email not in correct format");
    } else {
      setEmailerrormsg("");
    }

    if (!passwordValidation()) {
      setLengtherror("password should contain minimum of 8 characters");
    } else {
      setLengtherror("");
    }

    if (!cnfPasswordValidation()) {
      setMismatcherror("password mismatch");
    } else {
      setMismatcherror("");
    }

    if (
      fnameValidation() &&
      lnameValidation() &&
      emailValidation() &&
      passwordValidation() &&
      cnfPasswordValidation()
    ) {
      navigate("/profile", {
        state: {
          first_name: fname,
          last_name: lname,
          emailid: email,
        },
      });
    }
  };

  const fnameValidation = () => {
    const nameregex = /^[a-zA-Z]+$/;
    if (!nameregex.test(fname)) {
      return false;
    }
    return true;
  };

  const lnameValidation = () => {
    const nameregex = /^[a-zA-Z]+$/;
    if (!nameregex.test(lname)) {
      return false;
    }
    return true;
  };

  const emailValidation = () => {
    const emailregex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!emailregex.test(email)) {
      return false;
    }
    return true;
  };

  const passwordValidation = () => {
    if (pwd.length < 8) {
      return false;
    }
    return true;
  };

  const cnfPasswordValidation = () => {
    if (cpwd !== pwd) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <form name="register" onSubmit={handleValidation}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={400}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          marginBottom={5}
          padding={13}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" paddingBottom={5}>
            Register here
          </Typography>
          <Tooltip title="Please enter only letters">
            <TextField
              error={ferrormsg ? true : false}
              helperText={ferrormsg}
              onChange={(e) => setFname(e.target.value)}
              value={fname}
              margin="normal"
              type={Text}
              variant="outlined"
              label="Firstname"
              required
            ></TextField>
          </Tooltip>
          <Tooltip title="Please enter only letters">
            <TextField
              error={lerrormsg ? true : false}
              helperText={lerrormsg}
              onChange={(e) => setLname(e.target.value)}
              margin="normal"
              value={lname}
              type={Text}
              variant="outlined"
              label="Lastname"
              required
            ></TextField>
          </Tooltip>
          <TextField
            margin="normal"
            helperText={emailerrormsg}
            error={emailerrormsg ? true : false}
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            required
          ></TextField>
          <TextField
            margin="normal"
            type={"password"}
            label="Password"
            error={lengtherror ? true : false}
            helperText={lengtherror}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          ></TextField>
          <TextField
            margin="normal"
            type={"password"}
            label="Confirm Password"
            error={mismatcherror ? true : false}
            helperText={mismatcherror}
            onChange={(e) => setCpwd(e.target.value)}
            value={cpwd}
            required
          ></TextField>
          <Button
            type="submit"
            sx={{
              marginTop: 3,
              borderRadius: 5,
              width: 100,
              alignSelf: "center",
              justifyContent: "center",
              ":hover": { background: "black" },
            }}
            variant="contained"
            color="warning"
          >
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default RegisterForm;
