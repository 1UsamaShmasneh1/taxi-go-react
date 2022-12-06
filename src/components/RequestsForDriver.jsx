import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import useAuth from "../hooks/useAuth";
import ReadOnlyRequestRowForDriver from "./ReadOnlyRequestRowForDriver";
import DriverMission from "./DriverMission";

const RequestsForDriver = () => {
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [drivers, setDriver] = useState([]);
    const [taxis, setTaxis] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    const [isInMission, setIsInMission] = useState(false);
    const [request, setRequest] = useState(null);

    
    useEffect( () => {
        let isMounted = true;
        const controller = new AbortController();

        const getRequests = async () => {
            try {
                const response = await axios.get('/Requests', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setRequests(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        const getUsers = async () => {
            try {
                const response = await axios.get('/Users', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setUsers(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        const getDrivers = async () => {
            try {
                const response = await axios.get('/Drivers', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setDriver(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        const getTaxis = async () => {
            try {
                const response = await axios.get('/Taxis', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setTaxis(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        const checkIsInMission = () => {
            let driverIndex = drivers.findIndex(driver => driver.userId === auth.user.id);
            let driver = drivers[driverIndex];
            let taxiIndex = taxis.findIndex(taxi => taxi.driverId === driver.id);
            let taxi = taxis[taxiIndex];
            let requestIndex = requests.findIndex(req => req.taxiId === taxi.id)
            if(requestIndex !== -1){
                setRequest(requests[requestIndex]);
                setIsInMission(true);
            }else{
                let relevantRequests = requests.filter(req => req.taxiId === null);
                setRequests(relevantRequests);
                setRequest(null);
                setIsInMission(false);
            }
        }

        getRequests();
        getUsers();
        getDrivers();
        getTaxis();
        checkIsInMission();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [navigate, location, auth])

    

    const  handleGoClick = async (e,request) =>{
        e.preventDefault();
        let driverIndex = drivers.findIndex(driver => driver.userId === auth.user.id);
        let driver = drivers[driverIndex];
        let taxiIndex = taxis.findIndex(taxi => taxi.driverId === driver.id);
        if(taxiIndex === -1){
            return
        }
        let taxi = taxis[taxiIndex];
        let updatedRequest = request
        updatedRequest.taxiId = taxi.id;
        
        try {
            await axios.put('/Requests/' + request.id, updatedRequest, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
        setIsInMission(true);
        setRequest(request);
    }

    const  handleCancelClick = async (e, request) =>{
        e.preventDefault();
        let updatedRequest = request
        updatedRequest.taxiId = null;
        try {
            await axios.put('/Requests/' + request.id, updatedRequest, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
        setIsInMission(false);
        setRequest(null);
    }

    const  handleEndClick = async (e, request) =>{
        e.preventDefault();
        try {
            await axios.delete('/Requests/' + request.id, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        try {
            const response = await axios.get('/Requests', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
            setRequests(response.data);
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        setIsInMission(false);
        setRequest(null);
        
    }

    return (
        isInMission ?
        <Container className="App">
            <DriverMission
                request = {request}
                users = {users}
                handleCancelClick = {handleCancelClick}
                handleEndClick = {handleEndClick}
            />
        </Container>
        :
        <Container className="App">
            <Row>
                <Col>
                    <h1 style={{margin: "20px 0"}}>Riquests List</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <form>
                    <Table responsive hover>
                        <thead>
                        <tr>
                            <th>Customer email</th>
                            <th>Passengers count</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => {
                            return (
                                <Fragment key={request.id}>
                                    <ReadOnlyRequestRowForDriver
                                        request = {request}
                                        users = {users}
                                        handleGoClick = {handleGoClick}
                                    />
                                </Fragment>
                            )
                        })}
                        </tbody>
                    </Table>
                </form>
                </Col>
            </Row>
        </Container>
    )
};

export default RequestsForDriver;