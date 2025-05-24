const express = require("express");
const cors = require("cors");
const axios = require("axios");
const sequelize = require("./config/initdb.js");
const postRouter = require("./routes/post.js");

// authenticate db
async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log("DB authentication successful. Connected");
  } catch (err) {
    console.log(err);
  }
}

authenticateDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/parse-url", async (req, res) => {
  try {
    const response = await axios.get(req.body.url);
    console.log(req.body);

    res.json(response.data);
  } catch (err) {
    // console.log(err);
  }
});

app.listen(3000, () => console.log("server running"));
