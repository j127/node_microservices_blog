const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {});

const PORT = 4003;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}/`);
});
