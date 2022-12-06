import React from "react";
import Button from 'react-bootstrap/Button';

const ReadOnlyRequestRow = ({request, users, handleGoClick}) => {

    const getEmail = () =>{
        const userIndex = users.findIndex(user => user.id === request.userId)
        let userEmail = '';
        try{
            userEmail = users[userIndex].email;
            return userEmail;
        }catch{
            return userEmail;
        }
    }

    return(
        <tr key={request.id}>
            <th scope="row">{getEmail()}</th>
            <td>{request.passengerCount}</td>
            <td>{request.location}</td>
            <td>
                <Button 
                    type="button"
                    variant="success"
                    onClick = {(e) => handleGoClick(e, request)}
                >
                        Go
                </Button>
            </td>
        </tr>
    )
}

export default ReadOnlyRequestRow