import express, { response } from "express";
import items from "./items.json";
import {MongoClient} from "mongodb";

type loginRequest = {
    username: string,
    password: string
}

type loginResponse = {
    token: string,
    status: string,
}

type stockItem = {
    name: string,
    description: string,
    imgPath: string
}

// use a separate router object for API routes
const apiRouter = express.Router();

// the stockinfo route sends a JSON representation of the items in stock
apiRouter.get("/stockinfo", (req, res) => {
    res.json(items);
});

apiRouter.post("/adminlogin", (req, res) => {
    let isValid = true
    let loginRequest: loginRequest = {
        username: req.body.username,
        password: req.body.password
    }

    let loginResponse: loginResponse = {
        token: "",
        status: ""
    }

    // both fields must exist and must be strings for the login request to be valid
    if (typeof(loginRequest.username) != "string" || typeof(loginRequest.password) != "string") {
        res.send("Error: Invalid Request Format");
    }
    // if the input is valid, check that the username and password combination is valid
    else {
        let password: string = "";
        switch (loginRequest.username) {
            case "admin":
                // not null assertion is used, ensure the admin_pass property always exists
                // fetch the admin password environment variable
                password = process.env.ADMIN_PASS!.toString();
            // the default case runs if there is no matching username
            case "default":
                break;
        }

        // runs only if the username and password combination is valid 
        if (loginRequest.password == password) {
            // generate a token and add it to the session tokens table
            loginResponse.token = "";
            loginResponse.status = "Login Success!";
        }
        // password is incorrect
        else {
            loginResponse.status = "Invalid username or password";
        }

        // return a response to the user
        res.send(loginResponse);
    }
});

apiRouter.get("/stockdb", (req, res) => {
    const uri = process.env.DB_URI ?? "";
    const client = new MongoClient(uri);
    const db = client.db("Lunar-Designs");
    const collection = db.collection("stock")
    
    res.send("Test");
})
export default apiRouter;