const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:8080",
  })
);

const userRouter = require("./routes/user.js");
app.use("/user", userRouter);
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
