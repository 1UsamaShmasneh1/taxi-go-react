import React from "react";
import { Link } from "react-router-dom";
import UserRequest from "./UserRequest";
import About from './About';
import ContactUs from './ContactUs';
import UserHeader from "./UserHeader";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
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
            <UserHeader tagOnChange = {tagOnChange} onClickLoguot = {onClickLoguot}/>
            <br />
            {
                tag === '' ?
                <UserRequest />
                : tag === 'about' ?
                <About />
                : tag === 'contactUs' ?
                <ContactUs /> :
                null
            }
            <br />
            <div className="flexGrow">
                <Link to="/userHome">Home</Link>
            </div>
        </section>
    )
}

export default UserHome