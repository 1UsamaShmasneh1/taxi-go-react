import React from "react";
import { Button } from "reactstrap";

const ReadOnlyUserRow = ({user, handleEditClick}) => {
    return(
        <tr key={user.id}>
            <th scope="row">{user.firstName +"  " + user.lastName}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>
            <div>
                <Button 
                    type="button"
                    color="warning"
                    onClick = {(e) => handleEditClick(e, user)}
                >
                        Edit
                </Button>
            </div>
            </td>
        </tr>
    )
}

export default ReadOnlyUserRow