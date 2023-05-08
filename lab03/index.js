const { NodeAdapter } = require("ef-keycloak-connect");
const express = require("express");
const app = express();
const config = {
  realm: "demo-realm",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  resource: "express-app",
  "verify-token-audience": true,
  credentials: {
    secret: "XTyQVnCPVCOT8WjFxSc0Px62yYCweG7S",
  },
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  "policy-enforcer": {},
};

const keyclock = new NodeAdapter(config);
app.use(keyclock.middleware());

app.get("/", (req, res) => {
  res.send("Main site");
});

app.get("/hello", keyclock.protect(), (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
