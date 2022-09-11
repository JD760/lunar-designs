import React from 'react';

class Session {
    constructor(sessionID = null) { 
        this.sessionID = sessionID;
    }

    public sessionID: string | null;

    public setupSession = () => {
        // check local storage for existing session
        if (localStorage.getItem("sessionID") !== "") {
            this.sessionID = localStorage.getItem("sessionID");
            return;
        // if session ID does not already exist, create a new ID
        } else {
            this.sessionID = (Date.now() * Math.floor(Math.random() * 100)).toString();
            localStorage.setItem("sessionID", this.sessionID);
        }
    }
}