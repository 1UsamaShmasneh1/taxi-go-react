import React from "react";
import { Link } from "react-router-dom";
import Users from './Users';
import Taxis from './Taxis';
import Drivers from './Drivers';
import Requests from './Requests';
import About from './About';
import ContactUs from './ContactUs';
import AdminHeader from "./AdminHeader";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [tag, setTag] = useState('users');
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
            <AdminHeader tagOnChange = {tagOnChange} onClickLoguot = {onClickLoguot}/>
            <br />
            {
                tag === 'users' ?
                <Users />
                : tag === 'taxis' ?
                <Taxis />
                : tag === 'drivers' ?
                <Drivers />
                : tag === 'requests' ?
                <Requests />
                : tag === 'about' ?
                <About />
                : tag === 'contactUs' ?
                <ContactUs /> :
                null
            }
            <br />
            <div className="flexGrow">
                <Link to="/adminHome">Home</Link>
            </div>
        </section>
    )
}

export default AdminHome