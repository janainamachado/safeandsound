import { Navbar, Container, Nav } from "react-bootstrap";
import React from 'react';

function NavBar(){

    return(
  <Navbar fixed="top" bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Safe and Sound</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="add-a-review">Review a venue</Nav.Link>
              <Nav.Link href="reviews-list">See all reviews</Nav.Link>
            </Nav>
          </Navbar.Collapse>
    </Container>
  </Navbar>

    )
}



export default NavBar;