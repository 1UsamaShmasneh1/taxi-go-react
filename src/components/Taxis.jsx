import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import useAuth from "../hooks/useAuth";
import ReadOnlyTaxiRow from "./ReadOnlyTaxiRow";
import EditableTaxiRow from "./EditableTaxiRow";
import Button from 'react-bootstrap/Button';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Taxis = () => {
    const [drivers, setDrivers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [taxis, setTaxis] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [editTaxiId, setEditTaxiId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        number:"",
        taxi:"",
        driver:"",
        isAvailable:""
    });

    const [addFormData, setAddFormData] = useState({
        number: "",
        taxi: "",
        driver: ""
    });

    const [searchForm, setSearchForm] = useState({
        number:'',
        license:'',
        isAvailable:''
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDrivers = async () => {
            try {
                const response = await axios.get('/Drivers', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setDrivers([...response.data]);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        const getRequests = async () => {
            try {
                const response = await axios.get('/Requests', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setRequests([...response.data]);
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

        getDrivers();
        getRequests();
        getTaxis();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [navigate, location, auth])

    const handleEditClick = (e, taxi) => {
        e.preventDefault();
        setEditTaxiId(taxi.id);

        let driver = '';

        for (const d of drivers) {
            if(d.id === taxi.driverId){
                driver = d.firstName+' '+d.lastName
                break
            }
        }

        const formValues = {
            number: taxi.number,
            taxi: taxi.carLicense,
            driver: driver
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

        const newTaxis = [...taxis];
    
        const index = taxis.findIndex((taxi) => taxi.id === editTaxiId);

        let taxiNumber = taxis[index].number;
        
        newTaxis[index].number = editFormData.number;
        newTaxis[index].carLicense = editFormData.taxi;
        
        try {
            await axios.put('/Taxis/' + taxiNumber, newTaxis[index], { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        setTaxis(newTaxis);
        setEditTaxiId(null);
    };
    
    const handleDeleteClick = async (taxiId) => {
        const newTaxis = [...taxis];
    
        const index = taxis.findIndex((taxi) => taxi.id === taxiId);
    
        newTaxis.splice(index, 1);

        try {
            await axios.delete('/Taxis/' + taxiId, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    
        setTaxis(newTaxis);
      };

    const handleCancelClick = () => {
        setEditTaxiId(null);
      };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
    
        const newTaxi = {
            id:0,
            number: addFormData.number,
            carLicense: addFormData.taxi,
            driverId: null
        };

        try {
            await axios.post('/Taxis', newTaxi, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
            setErrMsg('');
            setAddFormData({
                number: "",
                taxi: "",
                driver: ""
              });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Some thing wrong!')
            }
        }

        try {
            const response = await axios.get('/Taxis', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
            setTaxis(response.data);
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
      };

    const handleAddFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
      };

    return (

        <Container className="App">
            <Row>
                <Col>
                    <h1 style={{margin: "20px 0"}}>Taxis List</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <form onSubmit={handleEditFormSubmit}>
                    <Table responsive hover>
                        <thead>
                        <tr>
                            <th>
                                <input type="text" name="number" placeholder='Search via car number' value={searchForm.number} onChange={handleSearchFormChange}/>
                            </th>
                            <th>
                                <input type="text" name="license" placeholder='Search via car license' value={searchForm.license} onChange={handleSearchFormChange}/>
                            </th>
                            <th></th>
                            <th>
                                <Button type="button" name="isAvailable" variant="warning" onClick = {handleSearchFormChange} value="na">N/A</Button>
                                <Button type="button" name="isAvailable" variant="success" onClick = {handleSearchFormChange} value="available"><FontAwesomeIcon icon={faCheck}/></Button>
                                <Button type="button" name="isAvailable" variant="danger" onClick = {handleSearchFormChange} value="unAvailable"><FontAwesomeIcon icon={faTimes}/></Button>
                            </th>
                        </tr>
                        <tr>
                            <th>Number</th>
                            <th>Taxi license</th>
                            <th>Driver</th>
                            <th>Availablety</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taxis.filter(t => t.number.toString().includes(searchForm.number.toString()) && 
                        t.carLicense.toString().includes(searchForm.license.toString()) && 
                        (searchForm.isAvailable === "unAvailable" ? 
                            requests.findIndex(r => r.taxiId === t.id) !== -1 : 
                            searchForm.isAvailable === "available" ? 
                            requests.findIndex(r => r.taxiId === t.id) === -1 : true)
                        ).map(taxi => {
                            return (
                                <Fragment key={taxi.id}>
                                    {editTaxiId === taxi.id ? (
                                            <EditableTaxiRow 
                                                taxi = {taxi}
                                                drivers = {drivers}
                                                editFormData = {editFormData}
                                                handleEditFormChange = {handleEditFormChange}
                                                handleCancelClick = {handleCancelClick}
                                            />
                                        ):(
                                            <ReadOnlyTaxiRow
                                                taxi = {taxi}
                                                requests = {requests}
                                                drivers = {drivers }
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
                <h2>Add a taxi</h2>
                <form onSubmit={handleAddFormSubmit}>

                    <input
                    type="text"
                    name="number"
                    required="required"
                    placeholder="Enter a taxi number..."
                    value={addFormData.number}
                    onChange={handleAddFormChange}
                    />

                    <input
                    type="text"
                    name="taxi"
                    required="required"
                    value={addFormData.taxi}
                    placeholder="Enter a car license..."
                    onChange={handleAddFormChange}
                    />

                    <button type="submit">Add</button>
                </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Taxis;