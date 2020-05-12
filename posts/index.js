const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// logger
app.use((req, _res, next) => {
    console.log(new Date(), req.method, req.url, req.body);
    next();
});

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };

    res.status(201).send(posts[id]);
});

const PORT = process.env.POSTS_PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
