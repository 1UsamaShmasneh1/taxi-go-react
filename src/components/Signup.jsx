import React,{ useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const EMAIL_REGEX = /.+@.+\..+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const PHONE_REGEX = /^0[0-9]{1,2}[0-9]{7}$/;
const REGISTER_URL = '/Account/signup';

const SignUp = () => {
    
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [isEmptyFN, setIsEmptyFN] = useState(false);
    
    const [lastName, setLastName] = useState('');
    const [isEmptyLN, setIsEmptyLN] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhone, setValidPhone] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        setIsEmptyFN(firstName==='');
     }, [firstName])

    useEffect(() => {
        setIsEmptyLN(lastName==='');
    }, [lastName])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axios.post(REGISTER_URL,
                {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    email: email,
                    password: pwd,
                    role: "User"
                }
            );
            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
            setIsFail(false);
            setErrMsg('');
        } catch (err) {
            setIsFail(true);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

  return (
    <>
      {success ? (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content text-center">
              <h3 className="Auth-form-title">Success</h3>
              <br/>
              <span className="link-primary" onClick={() => navigate("/logIn")}>
                SignIn
              </span>
            </div>
          </form>
        </div>
      ) : (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={() => navigate("/login")}>
                  Signin
                </span>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="firstname">
                    Firstname:
                    {!isEmptyFN ? <FontAwesomeIcon icon={faCheck}/> : null}
                    {isEmptyFN ? <FontAwesomeIcon icon={faTimes} /> : null}
                </label><br />
                <input
                    type="text"
                    id="firstname"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    className="form-control mt-1"
                    placeholder="Jane"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="lastname">
                  Lastname:
                  {!isEmptyLN ? <FontAwesomeIcon icon={faCheck}/> : null}
                  {isEmptyLN ? <FontAwesomeIcon icon={faTimes} /> : null}
                </label><br />
                <input
                  type="text"
                  id="lastname"
                  autoComplete="off"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  className="form-control mt-1"
                  placeholder="Doe"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="phoneNumber">
                  Phone number:
                  {validPhone ? <FontAwesomeIcon icon={faCheck}/> : null}
                  {!validPhone ? <FontAwesomeIcon icon={faTimes} /> : null}
                </label><br />
                <input
                  type="text"
                  id="phoneNumber"
                  autoComplete="off"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  required
                  className="form-control mt-1"
                  placeholder="0524575545"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">
                  Email:
                  {validEmail ? <FontAwesomeIcon icon={faCheck}/> : null}
                  {!validEmail ? <FontAwesomeIcon icon={faTimes} /> : null}
                </label><br />
                <input
                  type="text"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="form-control mt-1"
                  placeholder="abc@abc.com"
                />
              </div>
              <div className="form-group mt-3">
                <label>
                  Password:
                  {validPwd ? <FontAwesomeIcon icon={faCheck}/> : null}
                  {!validPwd ? <FontAwesomeIcon icon={faTimes} /> : null}
                </label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Aa1234567."
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <p id="pwdnote">
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: 
                  <span aria-label="exclamation mark">!</span> 
                  <span aria-label="at symbol">@</span> 
                  <span aria-label="hashtag">#</span> 
                  <span aria-label="dollar sign">$</span> 
                  <span aria-label="percent">%</span> 
                  <span aria-label="percent">.</span>
                </p>
              </div>
              <div className="form-group mt-3">
                <label>
                  Conferm password:
                  {validMatch && validPwd ? <FontAwesomeIcon icon={faCheck}/> : null}
                  {!validMatch || !validPwd ? <FontAwesomeIcon icon={faTimes} /> : null}
                  </label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Conferm Password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
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
            </div>
            <div className="flexGrow">
              <Link to="/">Home</Link>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default SignUp;