import React from 'react';
import '../styles/AdminLoginComponent.css';
import Cookies from "universal-cookie";

type loginResult = {
    success: boolean,
    value: string
}

/* Only populated if props are passed into this component */
interface IAdminProps {}

/* Type definitions for each state value */
interface IAdminState {
    username: string,
    password: string,
    loginResult: loginResult
}

class AdminLoginComponent extends React.Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginResult: {value: "", success: true}
        }
    }

    handleLogin = () => {
        // track validity of details
        let validUsername = true;
        let validPassword = false;
        // remove whitespace
        this.setState({username: this.state.username.trim()});
        this.setState({password: this.state.password.trim()});

        // validate username
        // check if username has numbers or capitals
        if (this.state.username.match(/[0-9][A-Z]/)) {
            validUsername = false;
            this.setState({loginResult: {success: false, value: "Username cannot contain numbers or capitals"}});
        }
        // check for length
        if (this.state.username.length < 5) {
            validUsername = false;
            this.setState({loginResult: {success: false, value: "Username must be more than 5 characters"}});
        }

        // validate password
        // check password length
        if (this.state.password.length < 7) {
            validPassword = false;
            this.setState({loginResult: {success: false, value: "Password must be more than 7 characters"}});
        }
        // must have one capital, lowercase, special
        if (this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)) {
            validPassword = false;
            this.setState({loginResult: {success: false, value: "Password does not meet the requirements"}});
        }

        if (validUsername && validPassword) {
            this.setState({loginResult: {success: true, value: "Login Successful"}});
        }

        const cookies = new Cookies();
        const sessionID = cookies.getAll()["session-cookie"];
    }


    render() {
        return (
            <div className="form-container">
                <div className="admin-login-form">
                    <p><u>Please enter the admin login details:</u></p>
                    <input
                        type="text"
                        placeholder="Username"
                        /* Update the username when the input field value changes */
                        onChange={(e) => this.setState({username: e.currentTarget.value})}
                    /> <br/><br/>
                    <input
                        type="password"
                        placeholder="Password"
                        /* Update the password when the value of the input field changes */
                        onChange={(e) => this.setState({password: e.currentTarget.value})}
                    /> <br/><br/>

                    {/* Call the login handling function when the user submits their details */}
                    <button onClick={this.handleLogin}>Login</button>

                    {/* Display the result of the login and colour the text based on success */}
                    <p 
                        className="login-result"
                        style={(this.state.loginResult.success) ? {color: 'green'}: {color: 'red'}}>
                    {this.state.loginResult.value}
                    </p>
                </div>
            </div>
        )
    }
}

export default AdminLoginComponent;