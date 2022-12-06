import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function DriverHeader({tagOnChange, onClickLoguot}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >Driver page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link onClick={(e) => onClickLoguot(e)}>Loguot</Nav.Link>
            <Nav.Link onClick={(e) => tagOnChange(e, 'about')}>About</Nav.Link>
            <Nav.Link onClick={(e) => tagOnChange(e, 'contactUs')}>Contact us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DriverHeader;