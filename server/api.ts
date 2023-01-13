import express, { response } from "express";
import jwt from "jsonwebtoken"
import { handleError, orderModel, sessionModel, stockModel} from "./models";
import {Admin, MongoClient, ObjectId} from "mongodb";
import {Schema, model, connect, Types} from "mongoose";

type loginRequest = {
    username: string,
    password: string,
    session: number
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
    stockModel.find({}, "name img description", (err, result) => {
        if (err) {return handleError(err)}
        if (result === null) {
            console.log("No result");
            res.json("{}");
        } else {
            res.json(result);
        }
    })
});

// handle incoming POST request to the /api/adminlogin route
apiRouter.post("/adminlogin", (req, res) => {
    // structure the incoming request
    let loginRequest: loginRequest = {
        username: req.body.username,
        password: req.body.password,
        session: req.body.session
    }
    console.log(loginRequest);
    // define a structure for the outgoing response to the frontend
    let loginResponse: loginResponse = {
        token: "", // used to authorise future requests
        status: "" // displayed to the user if any error occurs
    }

    // both fields must exist and must be strings for the login request to be valid
    if (typeof(loginRequest.username) != "string" || typeof(loginRequest.password) != "string") {
        loginResponse.status = "Invalid Request Format"
        res.send(loginResponse);
    }
    // if the input is valid, check that the username and password combination is valid
    else {
        let password: string = "";
        switch (loginRequest.username) {
            case "admin":
                // not null assertion is used, ensure the admin_pass property always exists
                // fetch the admin password environment variable
                password = process.env.ADMIN_PASS ?? "";
            // the default case runs if there is no matching username
            case "default":
                break;
        }

        // runs only if the username and password combination is valid 
        if (loginRequest.password === password) {
            // generate a token
            const token = jwt.sign({
                session: loginRequest.session,
                isAdmin: true
            },
            process.env.TOKEN_SECRET ?? "",
            {expiresIn: "24h"}
            );
            loginResponse.status = "Login Success!";
            loginResponse.token = token;
        }
        // username or password are incorrect
        else {
            loginResponse.status = "Invalid username or password";
        }

        // create a new session object
        const session = new sessionModel({
            session: loginRequest.session,
            token: loginResponse.token,
            created: Date.now(),
            expires: Date.now() + (3600*24)
        });

        // save the session to the database
        session.save()
            .catch((err) => {
                // 11000 is the error code for duplicate key
                // it is caused when the same session attempts to generate >1 token
                if (err.code == 11000) {return;}
                else {handleError}
            })
        console.log(loginResponse);
        res.send(loginResponse);
    }
});

apiRouter.post("/neworder", (req, res) => {
    const order = new orderModel({
        // user data
        name: req.body.name,
        email: req.body.email,
        // shipping info
        streetAddress: req.body.streetAddress,
        postcode: req.body.postcode,
        // order price
        price: req.body.price,
        // order contents
        beads: (req.body.beads).toString()
    });

    order.save()
    .catch((err) => {
        if (err.code === 11000) {return;}
        else handleError(err);
    })

    res.json({"result": "Success"});
});
// protected routes
apiRouter.post("/updateStock", (req, res) => {
    const name = req.body.name;
    const description = req.body.description
    const img = req.body.img
})

export default apiRouter;