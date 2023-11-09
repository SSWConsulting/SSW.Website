import { google } from "googleapis";

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
const blogger = google.yo({
  version: "v3",
  auth: "YOUR API KEY",
