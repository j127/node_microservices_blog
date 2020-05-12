const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

// logger
app.use((req, _res, next) => {
    console.log(new Date(), req.method, req.url, req.body);
    console.log("commentsByPostId", commentsByPostId);
    next();
});

app.get("/posts/:id/comments", (req, res) => {
    const { id } = req.params;
    res.send(commentsByPostId[id]) || [];
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const { id } = req.params;

    const comments = commentsByPostId[id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[id] = comments;

    await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
        },
    });

    res.status(201).send(comments);
});

app.post("/events", (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
});

const PORT = process.env.COMMENTS_PORT || 4001;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
