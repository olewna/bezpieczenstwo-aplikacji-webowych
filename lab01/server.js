const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");
const app = express();
const port = 3333;

app.use(cors());
app.use(
  basicAuth({
    users: { admin: "butter" },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

function getUnauthorizedResponse(req) {
  return req.auth ? { msg: "Not hello world" } : { msg: "Brak danych" };
}

app.get("/login", (req, res) => {
  res.send({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
