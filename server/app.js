require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const host = "localhost";
app.use(express.json());
app.use(cors());

app.use("/user", require("./routes/user.js"));
app.use("/items", require("./routes/items.js"));

const server = app.listen(process.env.PORT || 5000, () => {
const port = server.address().port;
});
