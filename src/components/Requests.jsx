import React, { useState, useEffect, Fragment } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import useAuth from "../hooks/useAuth";
import ReadOnlyRequestRow from "./ReadOnlyRequestRow";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [taxis, setTaxis] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();

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

        const getTaxis = async () => {
            try {
                const response = await axios.get('/Taxis', { headers: {"Authorization" : `Bearer ${auth.accessToken}`} });
                isMounted && setTaxis([response.data]);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getRequests();
        getUsers();
        getTaxis();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [navigate, location, auth])

    return (

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
                            <th>Taxi number</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map(request => {
                            return (
                                <Fragment key={request.id}>
                                    <ReadOnlyRequestRow
                                        request = {request}
                                        users = {users}
                                        taxis = {taxis}
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
    );
};

export default Requests;