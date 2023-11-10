// import { JWT } from "google-auth-library";

export async function googleAuth() {
  // const client = new JWT({
  //   email: process.env.CLIENT_EMAIL,
  //   key: process.env.PRIVATE_KEY,
  //   scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
  // });
  // console.log("HELLO WORLD 1 !!!!!");
  // console.log(process.env.CLIENT_EMAIL);
  // console.log(process.env.PRIVATE_KEY);
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=id&part=snippet&part=status&maxResults=100&playlistId=PLpiOR7CBNvlpmhfwQeIVhbqZKxV-do0wY&key=${process.env.PRIVATE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
