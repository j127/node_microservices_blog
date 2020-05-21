const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// logger
app.use((req, _res, next) => {
    console.log(new Date(), req.method, req.url, req.body);
    next();
});

const posts = {};

app.get("/posts", (_req, res) => {
    res.send(posts);
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };

    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id,
            title,
        },
    });

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
});

const PORT = process.env.POSTS_PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
