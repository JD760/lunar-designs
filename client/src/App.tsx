import React from 'react';
import Cookies from "universal-cookie";

import DesignPageComponent from './components/design-page/DesignPageComponent';

const handleSession = (setSessionID: React.Dispatch<React.SetStateAction<number>>) => {
    const cookies = new Cookies();
    const cookiesList = cookies.getAll();

    if (cookiesList["session-cookie"]) {
        // retrieve existing session ID
        setSessionID(cookiesList["session-cookie"]);
    } else {
        // generate new session ID
        const sessionID = Date.now() * Math.floor(Math.random() * 100);
        cookies.set("session-cookie", sessionID, {
            path: "/",
            sameSite: "lax",
        });
        setSessionID(sessionID);
    }
}

function App() {
    const [sessionID, setSessionID] = React.useState(0);

    // fetch the session cookie or create a new cookie if it does not exist yet
    React.useEffect(() => handleSession(setSessionID), [sessionID]);


    return (
        <div className="App">
            <DesignPageComponent />
        </div>
    );
}

export default App;