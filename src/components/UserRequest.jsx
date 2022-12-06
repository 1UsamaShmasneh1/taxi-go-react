import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import useAuth from "../hooks/useAuth";
import UserRequestDetailes from "./UserRequestDetailes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const UserRequest = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    const [isHasRequest, setIsHasRequest] = useState(false);
    const [request, setRequest] = useState(null);
    const [isEmptyLoc, setIsEmptyLoc] = useState(true);
    const [isEmptyPas, setIsEmptyPas] = useState(true);
    const [userLocation, setUserLocation] = useState('');
    const [passengerCount, setPassengerCount] = useState('');

    
    useEffect( () => {
        let isMounted = true;
        const controller = new AbortController();

        const getRequests = async () => {
            try {
                const response = await axios.get('/Requests', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setRequests(response.data);
                let requestIndex = response.data.findIndex(req => req.userId === auth.user.id)
                if(requestIndex !== -1){
                    setRequest(response.data[requestIndex]);
                    setIsHasRequest(true);
                }else{
                    setRequest(null);
                    setIsHasRequest(false);
                }
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getRequests();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [navigate, location, auth])

    useEffect(() => {
        setIsEmptyLoc(userLocation==='');
    }, [userLocation])

    useEffect(() => {
        setIsEmptyPas(passengerCount==='');
    }, [passengerCount])

    const  handleSubmit = async (e) =>{
        e.preventDefault();
        let newRequest = {
            id: 0,
            userId: auth.user.id,
            passengerCount: passengerCount,
            location: userLocation,
            taxiId: null
        }
        try {
            await axios.post('/Requests', newRequest, { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        try {
            const response = await axios.get('/Requests', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
            setRequests(response.data);
            let requestIndex = response.data.findIndex(req => req.userId === auth.user.id)
            if(requestIndex !== -1){
                setRequest(response.data[requestIndex]);
                setIsHasRequest(true);
            }else{
                setRequest(null);
                setIsHasRequest(false);
            }
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
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

        setIsHasRequest(false);
        setRequest(null);
        
    }

    return (
        isHasRequest ?
        <Container className="App">
            <UserRequestDetailes
                request = {request}
                handleEndClick = {handleEndClick}
            />
        </Container>
        :
        <Container className="App">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Make your request</h3>
                    <div className="form-group mt-3">
                        <label htmlFor="location">
                            Enter your location:
                            {!isEmptyLoc ? <FontAwesomeIcon icon={faCheck}/> : null}
                            {isEmptyLoc ? <FontAwesomeIcon icon={faTimes} /> : null}
                        </label><br />
                        <input
                            type="text"
                            id="location"
                            autoComplete="off"
                            onChange={(e) => setUserLocation(e.target.value)}
                            value={userLocation}
                            required
                            className="form-control mt-1"
                            placeholder="city, street, st.number"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="passengerCount">
                            Enter your count passenger:
                            {!isEmptyPas ? <FontAwesomeIcon icon={faCheck}/> : null}
                            {isEmptyPas ? <FontAwesomeIcon icon={faTimes} /> : null}
                        </label><br />
                        <input
                            type="number"
                            id="location"
                            autoComplete="off"
                            onChange={(e) => setPassengerCount(e.target.value)}
                            value={passengerCount}
                            required
                            className="form-control mt-1"
                            placeholder="1"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Container>
    )
};

export default UserRequest;