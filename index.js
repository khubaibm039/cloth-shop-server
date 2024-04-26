const express = require("express");
const cors = require("cors");

require("dotenv").config();
const userRouter = require("./routes/User");

const app = express();
const port = process.env.port || 5000;
const { client } = require("./db");

app.use(cors());
app.use(express.json());

async function run() {
    try {
        client.connect();

        app.use(userRouter);

        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("The server is running....");
});

app.listen(port, () => {
    console.log(`the server is running on PORT${port}`);
});
