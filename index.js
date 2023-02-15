const express  = require('express');
const app = express();

const SpotifyWebApi = require('spotify-web-api-node');



const scopes = ["ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    
    "app-remote-control",
    "streaming",
   
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    
    "user-follow-modify",
    "user-follow-read",
  
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",

    "user-library-modify",
    "user-library-read",
    
    "user-read-email",
    "user-read-private"]

const spotifyapi = new SpotifyWebApi({
    clientId : "8c301f4598d24db2ad0a27bfd371c9e4",
    clientSecret : "be3941afb67047f786235c58571e3d8b",
    redirectUri : "http://localhost:8000/callback"
})

app.get('/login',(req,res)=>{
  res.redirect(spotifyapi.createAuthorizeURL(scopes));
})

app.get('/callback',(req,res)=>{
    const error = req.query.err;
    const code = req.query.code;
    const state = req.query.state;

    if(error)
    {
        res.send(error);
        return;
    }
    spotifyapi.authorizationCodeGrant(code).then(data=>{
        const access_token = data.body['access_token'];
        const expires_in = data.body['expires_in'];
        const refresh_token = data.body['refresh_token'];
        console.log(access_token)
        spotifyapi.setAccessToken(access_token);
        spotifyapi.setRefreshToken(refresh_token);
        
        res.send("you can log out")

        setInterval(
            async ()=> {
             const data = await spotifyapi.refreshAccessToken();
             const access_token = data.body['access_token'];
             spotifyapi.setAccessToken(access_token);
            },expires_in/2*1000
        )
    }).catch(err=>{res.send(err)});
})

app.listen(8000,()=>{
    console.log('your app is running')
})