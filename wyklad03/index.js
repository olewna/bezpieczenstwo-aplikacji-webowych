const express = require("express");
const axios = require("axios");
const { params } = require("express/lib/request");

const app = express();

const appPort = 5000;

const authEndpoint = "https://<your_site>/auth/oauth2/authorize";
const tokenEndpoint = "https://<your_site>/auth/oauth2/token";

const clientId = "YOUR_CLIENT_ID";
const clientSecret = "YOUR_CLIENT_SECRET";

const redirectUri = "http://localhost:5000/callback";

// only for demonstration

const codeVerifier = "1234567890";
const codeChallange = BASE64URL - ENCODE(SHA256(ASCII(codeVerifier)));

const authRequest = `${authEndpoint}?
    respone_type=code&
    client_id=${clientId}&
    redirect_uri=${redirectUri}&
    state=1234&+
    code_challenge=${codeChallange}&
    code_challange_method=S256
    `;

app.use((req, res, next) => {
  console.log("-------HEADERS-------");
  console.log(req.headers);
  console.log("-------PARAMS-------");
  console.log(req.query);
  next();
});

app.get("/start", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(`
        <!DOCTYPE html>
        <html>
            <body>
                <a href=${authRequest}>Login</a>
            </body>
        </html>
        `);
});

app.get("/callback", (req, res) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", redirectUri);
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("code", req.query.code);

  return axios.post(tokenEndpoint, params).then((response) => {
    accessToken = response.data.access_token || null;
    console.log("REZULTAT ZAPYTANIA O TOKEN: ");
    console.log(accessToken);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(response.data);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    res.send(`
            <!DOCTYPE html>
            <html>
                <body>
                    <h1>SUCCESS</h1>
                </body>
            </html>
        `);
  });
});

app.listen(appPort, () => {
  console.log(`App listening on port ${appPort}`);
});
