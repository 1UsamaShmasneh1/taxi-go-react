import React from "react";
import Button from 'react-bootstrap/Button';

const EditableTaxiRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  taxi,
  drivers
}) => {
    const chickDriver = () => {
        for (const driver of drivers) {
            if(driver.id === taxi.driverId)
            return(driver.firstName+' '+driver.lastName)
        }
        return ''
    }
    const driver = chickDriver();
  return (
    <tr key={taxi.id}>
        <th scope="row">{taxi.number}</th>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter a car license..."
            name="taxi"
            value={editFormData.taxi}
            onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            {driver}
        </td>
        <td></td>
        <td>
            <Button type="submit" variant="success">Save</Button>
                {' '}
            <Button type="button" variant="danger" onClick={handleCancelClick}>
                Cancel
            </Button>
        </td>
    </tr>
  );
};

export default EditableTaxiRow;