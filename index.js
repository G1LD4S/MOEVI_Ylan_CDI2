const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3000;
const ip = require("ip");
const bodyParser = require("body-parser");
const router = require("./routes/start");
const ipAddr = ip.address();

// app.use(cors());
app.use(express.static("front"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

// let lastHouseVisited = "Gryffindor";
// app.get("/", (req, res) => {
//     res.json({ message: lastHouseVisited });
// });
// app.post("/", (req, res) => {
//     console.log(req.body);
//     lastHouseVisited = req.body.house;
//     res.json({ message: lastHouseVisited });
// });

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
