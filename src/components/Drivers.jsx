import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import useAuth from "../hooks/useAuth";
import ReadOnlyDriverRow from "./ReadOnlyDriverRow";
import EditableDriverRow from "./EditableDriverRow";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [taxis, setTaxis] = useState([]);
    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    const [editDriverId, setEditDriverId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:"",
        taxiNumber:0
    });

    const [addFormData, setAddFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber:""
      });

    const getDrivers = async () => {
          try {
              const response = await axios.get('/Drivers', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
              setDrivers(response.data);
          } catch (err) {
              navigate('/login', { state: { from: location }, replace: true });
          }
      }

    const getUsers = async () => {
          try {
              const response = await axios.get('/Users', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
              setUsers(response.data.filter(u => u.role === "Driver"));
          } catch (err) {
              navigate('/login', { state: { from: location }, replace: true });
          }
      }

    const getTaxis = async () => {
          try {
              const response = await axios.get('/Taxis', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
              setTaxis([...response.data]);
          } catch (err) {
              navigate('/login', { state: { from: location }, replace: true });
          }
      }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getDrivers = async () => {
            try {
                const response = await axios.get('/Drivers', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setDrivers(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
  
      const getUsers = async () => {
            try {
                const response = await axios.get('/Users', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setUsers(response.data.filter(u => u.role === "Driver"));
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
  
      const getTaxis = async () => {
            try {
                const response = await axios.get('/Taxis', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setTaxis([...response.data]);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUsers();
        getDrivers();
        getTaxis();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [navigate, location, auth])

    const handleEditClick = (e, driver) => {
        e.preventDefault();
        setEditDriverId(driver.id);

        let taxiNum = 0;
        let usr = {}

        for (const t of taxis) {
            if(t.driverId === driver.id){
                taxiNum = t.number
                break
            }
        }

        if(taxiNum === 0)
            taxiNum = 'Not on taxi'
        
        for (const u of users) {
            if(u.id === driver.userId){
                usr = u
                break
            }
        }

        const formValues = {
            firstName: driver.firstName,
            lastName: driver.lastName,
            email: usr.email,
            phoneNumber: usr.phoneNumber,
            taxiNumber: taxiNum
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

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();

        let newDrivers = [...drivers];
        let newTaxis = [...taxis]
        let driverIndex = drivers.findIndex((driver) => driver.id === editDriverId);
        let taxiIndex = taxis.findIndex((taxi) => taxi.number == editFormData.taxiNumber);
        let driver = newDrivers[driverIndex];
        let usr = {};
        let taxiNum = 0;
        let taxi = {
            id:0,
            number:0,
            carLicense:0,
            driverId:null
        }

        if(taxiIndex !== -1){
            taxiNum = newTaxis[taxiIndex].number
            newTaxis[taxiIndex].driverId = driver.id
            taxi = {
                id:newTaxis[taxiIndex].id,
                number:newTaxis[taxiIndex].number,
                carLicense:newTaxis[taxiIndex].carLicense,
                driverId:driver.id
            }
        }

        for (const u of users) {
            if(u.id === drivers[driverIndex].userId){
                usr = u
                break
            }
        }
        
        driver.firstName = editFormData.firstName;
        driver.lastName = editFormData.lastName;
        driver.userId = usr.id
        usr.firstName = editFormData.firstName;
        usr.lastName = editFormData.lastName;
        usr.email = editFormData.email;
        usr.phoneNumber = editFormData.phoneNumber;
        
        try {
            await axios.put('/Users/' + usr.id, usr, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        try {
            await axios.put('/Drivers/' + editDriverId, driver, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        try {
            await axios.put('/Taxis/' + taxiNum, taxi, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        setDrivers(newDrivers);
        try {
            const response = await axios.get('/Taxis', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
            setTaxis([...response.data]);
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
        setEditDriverId(null);
    };

    const handleCancelClick = () => {
        setEditDriverId(null);
      };

    const handleAddFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
      };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
    
        const newDriverAccount = {
            firstName: addFormData.firstName,
            lastName: addFormData.lastName,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
            password: 'Aa123456789.',
            role: "Driver"
        };

        try {
            await axios.post('/Account/signup', newDriverAccount, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
            try {
                const response = await axios.get('/Users/' + addFormData.email, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                const newDriver = {
                    firstName: addFormData.firstName,
                    lastName: addFormData.lastName,
                    UserId:response.data.id
                };
                try {
                    await axios.post('/Drivers', newDriver, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                    setErrMsg('');
                    setAddFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phoneNumber:""
                    });
                    getUsers();
                    getDrivers();
                    getTaxis();
                } catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else {
                        setErrMsg('Some thing wrong!')
                    }
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else {
                    setErrMsg('Some thing wrong!')
                }
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Some thing wrong!')
            }
        }
    };

    const handleDeleteClick = async (driverId) => {
        const newUsers = [...users]
        const newDrivers = [...drivers];
    
        const driverIndex = drivers.findIndex((driver) => driver.id === driverId);
        const userIndex = users.findIndex((user) => user.id === newDrivers[driverIndex].userId);

        try {
            await axios.delete('/Drivers/' + driverId, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        try {
            await axios.delete('/Users/' + newUsers[userIndex].id, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        newDrivers.splice(driverIndex, 1);
        newUsers.splice(userIndex, 1);
    
        setDrivers(newDrivers);
        setUsers(newUsers);
      };

    return (

        <Container className="App">
            <Row>
                <Col>
                    <h1 style={{margin: "20px 0"}}>Drivers List</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <form onSubmit={handleEditFormSubmit}>
                    <Table responsive hover>
                        <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Taxi number</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {drivers.map(driver => {
                            return (
                                <Fragment key={driver.id}>
                                    {editDriverId === driver.id ? (
                                            <EditableDriverRow 
                                                driver = {driver} 
                                                taxis = {taxis}
                                                editFormData = {editFormData}
                                                handleEditFormChange = {handleEditFormChange}
                                                handleCancelClick = {handleCancelClick}
                                            />
                                        ):(
                                            <ReadOnlyDriverRow
                                                driver = {driver}
                                                users = {users}
                                                taxis = {taxis}
                                                handleEditClick = {handleEditClick}
                                                handleDeleteClick = {handleDeleteClick}
                                            />
                                        )
                                    }
                                </Fragment>
                            )
                        })}
                        </tbody>
                    </Table>
                </form>
                <h2>Add a driver</h2>
                <form onSubmit={handleAddFormSubmit}>

                    <input
                    type="text"
                    name="firstName"
                    required="required"
                    placeholder="Enter a firstName..."
                    value={addFormData.firstName}
                    onChange={handleAddFormChange}
                    />

                    <input
                    type="text"
                    name="lastName"
                    required="required"
                    placeholder="Enter a lastName..."
                    value={addFormData.lastName}
                    onChange={handleAddFormChange}
                    />

                    <input
                    type="text"
                    name="email"
                    required="required"
                    value={addFormData.email}
                    placeholder="Enter an email..."
                    onChange={handleAddFormChange}
                    />
                    
                    <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter a phone number..."
                    value={addFormData.phoneNumber}
                    onChange={handleAddFormChange}
                    />

                    <button type="submit">Add</button>
                </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Drivers;