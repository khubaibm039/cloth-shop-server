const express = require("express");

const router = express.Router();
const { client } = require("../db");
const userCollection = client.db("shopsyDB").collection("user");

router.get("/users", async (req, res) => {
    const cursor = userCollection.find();
    const result = await cursor.toArray(cursor);
    res.send(result);
});

router.post("/users", async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);
    res.send(result);
});

module.exports = router;
