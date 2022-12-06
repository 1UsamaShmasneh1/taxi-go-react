import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from 'react-router-dom';

const LOGIN_URL = '/Account/login';

const Login = () => {

    const {setAuth } = useAuth();
    const [userEmail, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [userEmail, pwd])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { email: userEmail, password:pwd }
            );
            const accessToken = response?.data?.token;
            const roles = response?.data?.roles;
            const user = response?.data?.user;
            
            setAuth({ roles, user, accessToken });
            setUser('');
            setPwd('');
            setIsFail(false)
            navigate(
              response.data.roles==="User"?"/userHome":
              response.data.roles==="Driver"?"/driverHome":
              response.data.roles==="Admin"?"/adminHome":
              "/unauthorized"
              );
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setIsFail(true);
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
                setIsFail(true);
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                setIsFail(true);
            } else {
                setErrMsg('Login Failed');
                setIsFail(true);
            }
        }
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={() => navigate("/signup")}>
              Signup
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              id="email"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={userEmail}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              id="username"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <br />
          <div>
            {isFail ? 
              <div className="alert alert-warning fade show" role="alert">
                {errMsg}
              </div>
            : null}
          </div>
          <br />
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <br />
        <div className="flexGrow">
          <Link to="/">Home</Link>
        </div>
      </form>
    </div>
  )
}

export default Login