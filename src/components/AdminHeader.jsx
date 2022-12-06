import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminHeader({tagOnChange, onClickLoguot}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >Admins page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={(e) => tagOnChange(e,'users')}>Users</Nav.Link>
            <Nav.Link onClick={(e) => tagOnChange(e,'taxis')}>Taxis</Nav.Link>
            <Nav.Link onClick={(e) => tagOnChange(e,'drivers')}>Drivers</Nav.Link>
            <Nav.Link onClick={(e) => tagOnChange(e,'requests')}>Requests</Nav.Link>
          </Nav>
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

export default AdminHeader;