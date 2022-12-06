import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useAuth from '../hooks/useAuth';

const UserRequestDetailes = ({request, handleEndClick}) => {

    const {auth} = useAuth();
    const user = auth.user;
  
  return (
    <Card className="text-center">
        <Card.Header>Hellow {user.email}</Card.Header>
        <Card.Body>
            <Card.Title>Your request</Card.Title>
            <Card.Text>
                Customer: {user.email}
                <br/>
                Phone number: {user.phoneNumber}
                <br/>
                Location: {request.location}
                <br/>
            </Card.Text>
            <br/>
            <Button variant="primary" onClick={(e) => handleEndClick(e, request)} >End</Button>
        </Card.Body>
    </Card>
  );
}

export default UserRequestDetailes;