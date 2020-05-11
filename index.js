const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const router = require("./routes/router");

const mongoose = require("mongoose");
const mongoDbUrl = "";
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true
});

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

require("./services/passport");

router(app);

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
