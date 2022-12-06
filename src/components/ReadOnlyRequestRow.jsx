import React from "react";

const ReadOnlyRequestRow = ({request, users, taxis}) => {

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

    const taxiIndex = taxis.findIndex(taxi => taxi.id === request.taxiId)
    let taxiNum = 0;

    try{
        taxiNum = taxis[taxiIndex].number;
    }catch{
        taxiNum = 'Waiting!'
    }
    return(
        <tr key={request.id}>
            <th scope="row">{getEmail()}</th>
            <td>{request.passengerCount}</td>
            <td>{request.location}</td>
            <td>{taxiNum}</td>
        </tr>
    )
}

export default ReadOnlyRequestRow