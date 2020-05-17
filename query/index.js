const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        console.log("query service here");
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
        console.log("changed status because CommentUpdated", comment);
    }
};

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
    handleEvent(type, data);
    res.send({});
});

const PORT = 4002;
app.listen(PORT, async () => {
    console.log(`listening at http://localhost:${PORT}`);
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
        console.log("processing event", event.type);
        handleEvent(event.type, event.data);
    }
});
