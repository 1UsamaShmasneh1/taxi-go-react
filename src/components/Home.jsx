import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const onClickLogin = (e) => {
    navigate('/login')
  }

  const onClickSignup = (e) => {
    navigate('/signup')
  }

  const onClickAbout = (e) => {
    navigate('/about')
  }

  const onClickContactUs = (e) => {
    navigate('/contactUs')
  }

  return (
    <div className="Auth-form-container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link onClick={(e) => onClickLogin(e)}>Login</Nav.Link>
              <Nav.Link onClick={(e) => onClickSignup(e)}>Signup</Nav.Link>
              <Nav.Link onClick={(e) => onClickAbout(e)}>About</Nav.Link>
              <Nav.Link onClick={(e) => onClickContactUs(e)}>Contact us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Home;