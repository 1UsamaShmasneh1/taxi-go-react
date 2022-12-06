import React from "react";
import Button from 'react-bootstrap/Button';

const EditableDriverRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  driver
}) => {

  return (
    <tr key={driver.id}>
        <th scope="row">{driver.firstName +"  " + driver.lastName}</th>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter a firstName..."
            name="firstName"
            value={editFormData.firstName}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter a lastName..."
            name="lastName"
            value={editFormData.lastName}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="number"
            placeholder="Enter a taxi number..."
            name="taxiNumber"
            value={editFormData.taxiNumber}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="email"
            required="required"
            placeholder="Enter an email..."
            name="email"
            value={editFormData.email}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter a phone number..."
            name="phoneNumber"
            value={editFormData.phoneNumber}
            onChange={handleEditFormChange}
            ></input>
        </td>
        
        <td>
            <Button type="submit" variant="success" >Save</Button>
                {' '}
            <Button type="button" variant="danger" onClick={handleCancelClick}>
                Cancel
            </Button>
        </td>
    </tr>
  );
};

export default EditableDriverRow;