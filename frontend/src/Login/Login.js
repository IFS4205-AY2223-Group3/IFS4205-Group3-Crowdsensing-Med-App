import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import './Login.css'
import * as constantClass from '../api/constants'

const LOGIN_URL = constantClass.LOGIN_URL;

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [userRole, setRole] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

    //    // Comment out to test success

    //     // Getting response 
    //     const accessToken = "response?.data?.accessToken";
    //     const userRole = "patient";
    //     const name = "John"
    //     const userId = "response?.data.userId";

    //     // Auth Token
    //     setAuth({ userId, name, userRole, accessToken });
    //     setUser('');
    //     setPwd('');
    //     setRole('');
    //     setSuccess(true);

        
        

        // try {
        //     const response = await axios.post(LOGIN_URL,
        //         JSON.stringify({ user, pwd, userRole }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));
        //     //console.log(JSON.stringify(response));

        //     // Getting response 
        //     const accessToken = response?.data?.accessToken;
        //     const userRole = response?.data?.role;
        //     const name = response?.data?.name;
        //     const userId = response?.data.userId;

        //     // Auth Token
        //     setAuth({ userId, name, userRole, accessToken });
        //     setUser('');
        //     setPwd('');
        //     setRole('');
        //     setSuccess(true);


        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //         // setSuccess(true);

        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing Username or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>IFS4205 Group 3 Medical Application</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <label htmlFor="role">Role: </label>
                            <select 
                                value={userRole} 
                                name="roleDropdown"
                                onChange={(e) => setRole(e.target.value)}
                                required>
                            <option disabled selected value="">Select Role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="medicalStaff">Medical Helper</option>
                            <option value="researcher">Researcher</option>
                        </select>
                        <button>Sign In</button>
                    </form>
                </section>
            )}
        </>
    )

}

export default Login