require("dotenv").config();
const uri = process.env.MONGO_CLIENT_KEY;
const { MongoClient } = require("mongodb");
import * as mongoDB from "mongodb";

declare global {
  var Mongo: mongoDB.MongoClient;
}

export const mongo: mongoDB.MongoClient = new MongoClient(uri);
export const clientPromise = mongo.connect();

// declares mongo globals
