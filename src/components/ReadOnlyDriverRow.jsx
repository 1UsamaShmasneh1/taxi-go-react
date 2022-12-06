import React from "react";
import Button from 'react-bootstrap/Button';

const ReadOnlyDriverRow = ({driver, users, taxis, handleEditClick, handleDeleteClick}) => {
    const driverForm = {
        fullName:'',
        firstName:'',
        lastName:'',
        taxiNumber:0,
        email:'',
        phoneNumber:''
    }

    driverForm.fullName = driver.firstName + ' ' + driver.lastName;
    driverForm.firstName = driver.firstName;
    driverForm.lastName = driver.lastName;

    const getTaxiNumber = () => {
        for (const t of taxis) {
            if(t.driverId === driver.id){
                return t.number
            }
        }

        if(driverForm.taxiNumber === 0)
            return 'Not on taxi'
    }
    driverForm.taxiNumber = getTaxiNumber();

    const getEmail = () => {
        for (const u of users) {
            if(u.id === driver.userId){
                return u.email;
            }
        }
    }
    driverForm.email = getEmail();

    const getPhoneNumber = () => {
        for (const u of users) {
            if(u.id === driver.userId){
                return u.phoneNumber;
            }
        }
    }
    driverForm.phoneNumber = getPhoneNumber();

    return(
        <tr key={driver.id}>
            <th scope="row">{driverForm.fullName}</th>
            <td>{driverForm.firstName}</td>
            <td>{driverForm.lastName}</td>
            <td>{driverForm.taxiNumber}</td>
            <td>{driverForm.email}</td>
            <td>{driverForm.phoneNumber}</td>
            <td>
            <div>
                <Button 
                    type="button"
                    variant="warning"
                    onClick = {(e) => handleEditClick(e, driver)}
                >
                        Edit
                </Button>
                {' '}
                <Button 
                    type="button"
                    variant="danger"
                    onClick = {() => handleDeleteClick(driver.id)}
                >
                        Delete
                </Button>
            </div>
            </td>
        </tr>
    )
}

export default ReadOnlyDriverRow