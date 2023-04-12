import * as React from "react";
import { useState } from "react";
import { Typography, Tooltip } from "@mui/material";
import styled from "styled-components";
import { Button } from "primereact/button";
import sellcarimg from "../assets/sellcarimg.jpg";
import axios from "axios";
import Navigationbar from "./Navbar";

const SellProduct = () => {
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [owneremail, setOwneremail] = useState("");
  const [ownername, setOwnername] = useState("");

  const fileRef = React.useRef(null);

  console.log("category " + category);
  console.log("description " + description);
  console.log("price " + price);

  const handleImage = (event) => {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = fileRef.current.files[0];

    const formData = new FormData();
    formData.append("image", file);
    formData.append("model", model);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("ownername", ownername);
    formData.append("owneremail", owneremail);

    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_IP}/awsbackend/addcar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result);
  };

  return (
    <>
      <Navigationbar></Navigationbar>
      <StyledLoginImgWrapper className="login-img-wrapper">
        <form
          className="login-form"
          id="sellCarForm"
          method="post"
          enctype="multipart/form-data"
        >
          <Typography variant="h2" sx={{ color: "#1e69ba" }} paddingBottom={5}>
            Sell Car
          </Typography>

          <div className="input-wrapper">
            <h6 className="form-text">Select Category</h6>

            <select
              id="lang"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option>Sedan</option>
              <option>SUV</option>
              <option>Polo</option>
              <option>Mini-Truck</option>
            </select>
          </div>

          <div className="input-wrapper">
            <h6 className="form-text">Enter Description</h6>
            <Tooltip title="Enter Description">
              <input
                margin="normal"
                value={description}
                type="text"
                name="description"
                variant="outlined"
                label="Firstname"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Tooltip>
          </div>
          <div className="input-wrapper">
            <h6 className="form-text">Enter Model</h6>
            <Tooltip title="Enter Model">
              <input
                margin="normal"
                value={model}
                type="text"
                name="model"
                variant="outlined"
                label="name"
                required
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </Tooltip>
          </div>
          <div className="input-wrapper">
            <h6 className="form-text">Owner Name</h6>
            <Tooltip title="Owner Name">
              <input
                margin="normal"
                value={ownername}
                type="text"
                name="ownername"
                variant="outlined"
                label="name"
                required
                onChange={(e) => {
                  setOwnername(e.target.value);
                }}
              />
            </Tooltip>
          </div>
          <div className="input-wrapper">
            <h6 className="form-text">Email</h6>
            <Tooltip title="Owner Email">
              <input
                margin="normal"
                value={owneremail}
                type="text"
                name="owneremail"
                variant="outlined"
                label="name"
                required
                onChange={(e) => {
                  setOwneremail(e.target.value);
                }}
              />
            </Tooltip>
          </div>

          <div className="input-wrapper">
            <h6 className="form-text">Enter Price</h6>
            <Tooltip title="Enter Price">
              <input
                margin="normal"
                type="text"
                name="price"
                variant="outlined"
                label="Lastname"
                value={price}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Tooltip>
          </div>
          <div className="input-wrapper">
            <h6 className="form-text">Upload image</h6>
            <Tooltip title="Upload image">
              <input
                margin="normal"
                type="file"
                name="image"
                variant="outlined"
                label="Firstname"
                required
                onChange={handleImage}
                ref={fileRef}
              />
            </Tooltip>
          </div>

          <Button
            sx={{
              marginTop: 3,
              background: "1e69ba",
              color: "#1e69ba",
              borderRadius: 5,
              width: 100,
              alignSelf: "center",
              justifyContent: "center",
              ":hover": { background: "black" },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </form>
        <div className="login-img">
          <img src={sellcarimg} alt="" />
        </div>
      </StyledLoginImgWrapper>
    </>
  );
};

const StyledLoginImgWrapper = styled.div`
  display: flex;
  .p-button {
    background: #1e69ba;

    :hover {
      background: #1e69ba;
      color: white;
    }
  }

  .form-text {
    color: #1e69ba;
  }
  :hover {
    box-shadow: 1px 1px 2px 1px #1e69ba;
  }

  box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
  width: 70%;
  margin: 1rem auto;
  padding: 2rem;
  gap: 1rem;
  .login-form {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
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

export default SellProduct;
