import React from "react";
import Button from 'react-bootstrap/Button';

const ReadOnlyTaxiRow = ({requests, taxi, drivers, handleEditClick, handleDeleteClick}) => {
    
    
    const checkIsAvailable = () =>{
        for (const request of requests) {
            if(request.taxiId === taxi.id)
            return false
        }
        return true
    }

    const chickDriver = () => {
        for (const driver of drivers) {
            if(driver.id === taxi.driverId)
            return(driver.firstName+' '+driver.lastName)
        }
        return ''
    }
    
    const isAvailable = checkIsAvailable();
    const driver = chickDriver();

    return(
        <tr key={taxi.id}>
            <th scope="row">{taxi.number}</th>
            <td>{taxi.carLicense}</td>
            <td>{driver}</td>
            <td>
                {
                    isAvailable ? 
                    <Button variant="success" disabled={true} >Available</Button> 
                    :
                    <Button variant="danger" disabled={true} >Unavailable</Button>
                }
            </td>
            <td>
            <div>
                <Button 
                    type="button"
                    variant="warning"
                    onClick = {(e) => handleEditClick(e, taxi)}
                >
                        Edit
                </Button>
                {' '}
                <Button 
                    type="button"
                    variant="danger"
                    onClick = {() => handleDeleteClick(taxi.id)}
                >
                        Delete
                </Button>
            </div>
            </td>
        </tr>
    )
}

export default ReadOnlyTaxiRow