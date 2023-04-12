import { Container, Paper, Grid, Box, Button, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigationbar from "./Navbar";

const ViewProduct = () => {
  const [cardetails, setCardetails] = useState(null);

  useEffect(() => {
    const getData = async () => {
      console.log("rendering 1 time");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_IP}/awsbackend/viewcar`
      );
      setCardetails(result.data);
      console.log(result.data);
    };
    getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navigationbar></Navigationbar>
      <Container maxWidth="xl" sx={{ width: "80%" }}>
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          <Grid container spacing={2} justify="center">
            {cardetails?.map((index) => {
              return (
                <Grid item xs={12} sm={6} md={6} xl={6}>
                  <Box
                    p={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {console.log(index.img_url)}
                    <CarCard
                      category={index.category}
                      model={index.model}
                      price={index.price}
                      desc={index.description}
                      ownername={index.owner_name}
                      img={index.img_url}
                      email={index.owner_email}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default ViewProduct;
