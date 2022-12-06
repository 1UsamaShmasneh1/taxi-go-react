import React from 'react';
import Card from 'react-bootstrap/Card';
import useAuth from '../hooks/useAuth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const About = () => {

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
              <Card.Title>About us</Card.Title>
              <Card.Text>
                We are a taxi booking company.<br/>
                The site allows customers to order a taxi from anywhere in the country.<br/>
                The website allows drivers to choose the appropriate order for them according to the location.<br/>
                The site allows the administrators to see all the movements that take place on the site and to make changes to all the details of the users.<br/>
                For any problem you can contact us.
              </Card.Text>
          </Card.Body>
      </Card>
    </>
  );
}

export default About;