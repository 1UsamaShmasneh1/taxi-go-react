import React from 'react';
import Card from 'react-bootstrap/Card';
import useAuth from '../hooks/useAuth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {

  const {auth} = useAuth();
  const user = auth.user;
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
    <>
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
      <Card className="text-center">
          <Card.Header>Hellow {user.email}</Card.Header>
          <Card.Body>
              <Card.Title>Contact us</Card.Title>
              <Card.Text>
                  Email: us.05.07.91@gmail.com
                  <br/>
                  Phone number: 0525382178
              </Card.Text>
          </Card.Body>
      </Card>
    </>
  );
}

export default ContactUs;