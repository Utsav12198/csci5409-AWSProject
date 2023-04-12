import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigationbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>AutoHub</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="sellcar">Sell Car</Nav.Link>
            <Nav.Link href="viewcar">View Car</Nav.Link>
            <Nav.Link href="/">Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
