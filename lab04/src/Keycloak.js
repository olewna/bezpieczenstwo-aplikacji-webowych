import Keycloak from "keycloak-js";

function generateCodeVerifier() {
  const codeVerifierLength = 128;
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let codeVerifier = "";

  for (let i = 0; i < codeVerifierLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    codeVerifier += charset.charAt(randomIndex);
  }

  return codeVerifier;
}

function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const buffer = base64UrlEncode(data);
  return buffer;
}

function base64UrlEncode(input) {
  const base64 = btoa(String.fromCharCode.apply(null, input));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "lab04",
  clientId: "myclient2",
  pkceMethod: "S256",
  code_verifier: codeVerifier,
  code_challenge: codeChallenge,
});

export default keycloak;
