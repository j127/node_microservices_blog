const express = require("express");
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

app.get("/posts", (req, res) => {
    // TODO
});

app.get("/events", (req, res) => {
    // TODO
});

const PORT = 4002;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
