import React from "react";
import { Link } from "react-router-dom";
import RequestsForDriver from './RequestsForDriver'
import About from './About';
import ContactUs from './ContactUs';
import DriverHeader from "./DriverHeader";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const DriverHome = () => {
    const [tag, setTag] = useState('');
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    
    const tagOnChange = (e,t) => {
        e.preventDefault();
        setTag(t);
    }

    const onClickLoguot = (e) =>{
        e.preventDefault();
        setAuth({});
        navigate('/');
    }

    return (
        <section>
            <DriverHeader tagOnChange = {tagOnChange} onClickLoguot = {onClickLoguot}/>
            <br />
            {
                tag === '' ?
                <RequestsForDriver />
                : tag === 'about' ?
                <About />
                : tag === 'contactUs' ?
                <ContactUs /> :
                null
            }
            <br />
            <div className="flexGrow">
                <Link to="/driverHome">Home</Link>
            </div>
        </section>
    )
}

export default DriverHome