import { google } from "googleapis";

const YOUR_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const YOUR_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const YOUR_REDIRECT_URL = "http://localhost:3000";

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

export { authorizationUrl };
