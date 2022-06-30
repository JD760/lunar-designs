import React from 'react';
import '../styles/AdminLoginComponent.css';

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

    /* Send login data to the backend and update state */
    handleLogin = () => {
        this.postLoginInfo()
    }

    postLoginInfo = async () => {
        /*TODO: Post the hash to the backend */
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