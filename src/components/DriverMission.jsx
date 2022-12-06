import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const DriverMission = ({request, users, handleCancelClick, handleEndClick}) => {
  
  const getEmail = () =>{
    let userIndex = users.findIndex(user => user.id === request.userId);
    let userEmail = users[userIndex].email;
    return userEmail;
  }

  const getPhoneNumber = () =>{
    const userIndex = users.findIndex(user => user.id === request.userId);
    return users[userIndex].phoneNumber;
  }

  return (
    <Card className="text-center">
      <Card.Header>Hellow {}</Card.Header>
      <Card.Body>
        <Card.Title>Your mission</Card.Title>
        <Card.Text>
          Customer: {getEmail()}
          <br/>
          Phone number: {getPhoneNumber()}
          <br/>
          Location: {request.location}
          <br/>
        </Card.Text>
        <Button variant="primary" onClick={(e) => handleCancelClick(e, request)} >Cancel mission</Button>
        <br/>
        <br/>
        <Button variant="primary" onClick={(e) => handleEndClick(e, request)} >End mission</Button>
      </Card.Body>
    </Card>
  );
}

export default DriverMission;