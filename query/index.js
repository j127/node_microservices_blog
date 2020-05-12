const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

// logger
app.use((req, _res, next) => {
    console.log(new Date(), req.method, req.url, req.body);
    next();
});

app.get("/posts", (_req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log("[[query]] posts", posts);

    res.send({});
});

const PORT = 4002;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
