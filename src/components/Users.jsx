import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import useAuth from "../hooks/useAuth";
import ReadOnlyUserRow from "./ReadOnlyUserRow";
import EditableUserRow from "./EditableUserRow";


const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    const [editUserId, setEditUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:""
    });
    const [searchForm, setSearchForm] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:''
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('/Users', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setUsers(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [navigate, location, auth])

    const handleEditClick = (e, user) => {
        e.preventDefault();
        setEditUserId(user.id);

        const formValues = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
      
        setEditFormData(formValues);
    }

    const handleEditFormChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleSearchFormChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...searchForm };
        newFormData[fieldName] = fieldValue;

        setSearchForm(newFormData);
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();

        const newUsers = [...users];
    
        const index = users.findIndex((user) => user.id === editUserId);
        
        newUsers[index].firstName = editFormData.firstName;
        newUsers[index].lastName = editFormData.lastName;
        newUsers[index].email = editFormData.email;
        newUsers[index].phone = editFormData.phoneNumber;
        
        try {
            await axios.put('/Users/' + editUserId, newUsers[index], { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        setUsers(newUsers);
        setEditUserId(null);
    };

    const handleCancelClick = () => {
        setEditUserId(null);
      };

    return (

        <Container className="App">
            <Row>
                <Col>
                    <h1 style={{margin: "20px 0"}}>Users List</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <form onSubmit={handleEditFormSubmit}>
                    <Table responsive hover>
                        <thead>
                        <tr>
                            <th></th>
                            <th>
                                <input type="text" name="firstName" placeholder='Search via firstName' value={searchForm.firstName} onChange={handleSearchFormChange}/>
                            </th>
                            <th>
                                <input type="text" name="lastName" placeholder='Search via lastName' value={searchForm.lastName} onChange={handleSearchFormChange}/>
                            </th>
                            <th>
                                <input type="text" name="email" placeholder='Search via email' value={searchForm.email} onChange={handleSearchFormChange}/>
                            </th>
                            <th>
                                <input type="text" name="phoneNumber" placeholder='Search via phone number' value={searchForm.phoneNumber} onChange={handleSearchFormChange}/>
                            </th>
                        </tr>
                        <tr>
                            <th>Full name</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.filter(user => user.role === 'User' && 
                            user.firstName.includes(searchForm.firstName) && 
                            user.lastName.includes(searchForm.lastName) && 
                            user.email.includes(searchForm.email) && 
                            user.phoneNumber.includes(searchForm.phoneNumber)
                            ).map(user => {
                            return (
                                <Fragment key={user.id}>
                                    {editUserId === user.id ? (
                                            <EditableUserRow 
                                                user = {user} 
                                                editFormData = {editFormData}
                                                handleEditFormChange = {handleEditFormChange}
                                                handleCancelClick = {handleCancelClick}
                                            />
                                        ):(
                                            <ReadOnlyUserRow
                                                user = {user}
                                                searchForm = {searchForm}
                                                handleEditClick = {handleEditClick}
                                            />
                                        )
                                    }
                                </Fragment>
                            )
                        })}
                        </tbody>
                    </Table>
                </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Users;