import {Schema, model, Types, Mongoose, SchemaTypes} from "mongoose";

// Interfaces
interface ISession {
    session: Number,
    token: String,
    isAdmin: Boolean,
    created: Date,
    expires: Date
}

interface IStock {
    name: string,
    description: string,
    img: string
}

interface IOrders {
    name: string,
    email: string,
    streetAddress: string,
    postcode: string,
    city: string,
    price: number,
    beads: string
}

// Schemas
const sessionSchema = new Schema<ISession>({
    session: {type: Number, unique: true},
    token: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
    created: {type: Date, require: true},
    expires: {type: Date, require: false}
});

const stockSchema = new Schema<IStock>({
    name: {type: String, unique: false},
    description: {type: String, unique: false},
    img: {type: String, unique: false}
}, {collection: "stock"})

const orderSchema = new Schema<IOrders>({
    name: {type: String, unique: false},
    email: {type: String, unique: false},
    streetAddress: {type: String, unique: false},
    postcode: {type: String, unique: false},
    city: {type: String, unique: false},
    price: {type: Number, unique: false},
    beads: {type: String, unique: false},
}, {collection: "orders"})

// create models
export const sessionModel = model("Session", sessionSchema);
export const stockModel = model("stock", stockSchema);
export const orderModel = model("orders", orderSchema);

// handle errors associated with db operations
export const handleError = (err: any) => {
    console.log("An error occured! : ", err);
}