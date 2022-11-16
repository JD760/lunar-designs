/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./AdminLoginComponent.css";

type loginResult = {
    success: boolean,
    status: string,
    token: string
}

// populate with any props passed to the component
interface AdminLoginProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

// export the function as a module that can be included in other files
export default function AdminLoginComponent (props: AdminLoginProps) {
    const [username, setUsername] = useState<string>("test");
    const [password, setPassword] = useState<string>("test2");
    const [loginResult, setLoginResult] = useState<loginResult>({success: false, status: "", token: ""});
    const [loginAttempts, setLoginAttempts] = useState<number>(0);

    const handleLoginAttempt = () => {
        let loginBody = JSON.stringify({username: username, password: password});

        fetch("http://localhost:3001/api/adminlogin", {
            method: "POST", 
            body: loginBody, 
            headers: {"Content-Type": "application/json"}
        })
        .then((response) => {
            // if a HTTP error occurs, set the loginResult such that the login has failed
            if (!response.ok) {
                setLoginResult({success: false, status: response.status.toString(), token: ""});
                console.log(response.status.toString());
            }
            else {
                console.log(response.json());
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
                    <p className="success">Login Success!</p> 
                    :
                    /* Only show the login failure message if the user has tried to log in */
                    (loginAttempts > 0) ? <p className="failure">Login Failure</p> : <p></p>
                }
            </div>
        </div>
    )
}