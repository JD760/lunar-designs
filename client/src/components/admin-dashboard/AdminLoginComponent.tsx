/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./AdminLoginComponent.css";

type loginResult = {
    success: boolean,
    status: string,
    token: string
}

// populate with any props passed to the component
interface AdminLoginProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    sessionID: number
}

// export the function as a module that can be included in other files
export default function AdminLoginComponent (props: AdminLoginProps) {
    const [username, setUsername] = useState<string>("test");
    const [password, setPassword] = useState<string>("test2");
    const [loginResult, setLoginResult] = useState<loginResult>({success: false, status: "", token: ""});
    const [loginAttempts, setLoginAttempts] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginResult.success) {
            props.setLoggedIn(true);
        }
    }, [loginResult]);

    const handleLoginAttempt = () => {
        // the user may only attempt to log in 3 times to hinder brute force attacks
        if (loginAttempts >= 3) {
            setLoginResult({success: false, status: "Too Many Attempts", token: ""});
        }
        setLoginAttempts(loginAttempts + 1);

        // JSON provides a consistent format to exchange data between the frontend and backend
        let loginBody = JSON.stringify({username: username, password: password, session: props.sessionID});

        // use the fetch API to send a login request to the backend
        fetch("http://localhost:3001/api/adminlogin", {
            method: "POST", 
            body: loginBody, 
            headers: {"Content-Type": "application/json"},
        })
        .then((response) => {
            // if a HTTP error occurs, set the loginResult such that the login has failed
            if (!response.ok) {
                setLoginResult({success: false, status: response.status.toString(), token: ""});
                console.log(response.status);
            }
            else {
                response.json().then(data => (setLoginResult({success: true, status: data.status, token: data.token})))
                .finally(() => console.log(loginResult));
            }
        })
    }

    return (
        <div className="login-form-container">
            <div className="admin-login-form">
                <p><u>Please enter the admin login details:</u></p>
                <input
                    type="text"
                    placeholder="Username"
                    /* Update the username when the input field value changes */
                    onChange={(e) => setUsername(e.currentTarget.value)}
                /> <br/><br/>
                <input
                    type="password"
                    placeholder="Password"
                    /* Update the password when the value of the input field changes */
                    onChange={(e) => setPassword(e.currentTarget.value)}
                /> <br/><br/>

                {/* Call the login handling function when the user submits their details */}
                <button onClick={handleLoginAttempt}>Login</button>

                {/* Display the result of the login and colour the text based on success */}
                {/* Use a ternary expression (case) ? ifTrue : ifFalse */}
                {loginResult.success ?
                    <p className="success">{loginResult.status}</p> 
                    :
                    /* Only show the login failure message if the user has tried to log in */
                    (loginAttempts > 0) ? <p className="failure">{loginResult.status}</p> : <p></p>
                }
            </div>
        </div>
    )
}