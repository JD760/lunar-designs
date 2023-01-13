import React, { useEffect, useState } from "react";
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
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginResult, setLoginResult] = useState<loginResult>({success: false, status: "", token: ""});
    const [loginDataFetched, setLoginDataFetched] = useState<boolean>(false);

    // runs each time the state changes
    useEffect(() => {
        if (loginDataFetched && loginResult.success) {
            // create a cookie to store the token
            const cookies = new Cookies();
            cookies.set("token-cookie", loginResult.token, 
                {path: "/", sameSite: "lax"}
            );
            props.setLoggedIn(true);
        }
        // do nothing if the login is not successful
    }, [loginResult, loginDataFetched, props]);

    const handleLoginAttempt = async () => {
        // create the JSON data to send to the backend for authentication
        const loginBody = JSON.stringify({username: username, password: password, session: props.sessionID});
        // make a HTTP POST request to the backend
        await fetch("http://localhost:3001/api/adminlogin", 
        {method: "POST", headers: {"Content-Type": "application/json"}, body: loginBody})
        // wait for the promise to resolve and convert the response to JSON
        .then((response) => response.json())
        // wait for JSON conversion and use the JSON data to populate the login result fields
        .then((data) => {
            if (data.status === "Login Success!") {
                setLoginResult({success: true, status: data.status, token: data.token})
            } else {
                setLoginResult({success: false, status: data.status, token: data.token})
            }
            // allows the check to redirect the user to be run
            setLoginDataFetched(true);
        });
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
                    <p className="failure">{loginResult.status}</p>
                }
            </div>
        </div>
    )
}