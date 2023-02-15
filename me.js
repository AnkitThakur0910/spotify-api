const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')

const token = "BQAjdAML4vVTGWFIY5bpwUJOUGL8jL7ijpNa5VSNewWCneHyfYqq0yrmuh1I7fASGK5_kpVf2I4Gsvjnlm3v5WdG-qfBC8J5CUrN5jFYlAGJqWxLiibUe5Iow_EsRcGCDEBtqXf15SvIktmJDvxy5IajgCS7-lW7ZPKmfrlAMBw5RP-aknZrS8FVKbjgShLL2vBoaBmd-WtJGV22YHylDhCJO_lyfAmA0EQuRf5t_ypjKqw7eadPmLJPg2KsktrXcHuSoNdqS2zwSVd1UxxpaQbfNbBzKKCCCjOzGsCa8WwR2P-sr3nDtEOI4rlWwPab51bssLh04fxdg6NA6Q" 
const spotifyapi = new SpotifyWebApi()
spotifyapi.setAccessToken(token)
async function getmydata()
{
   
   try{
    const me = await spotifyapi.getMe();
        
    
    getplaylist(me)
   }
    catch(e)
    {
        console.log(e);
    }    
      

    
}

async function getplaylist(me)
{
    const playlist = await spotifyapi.getUserPlaylists(me);
    for(let data of playlist.body.items)
    {
        
        let tracks = getplayslisttracks(data.name,data.id)
    }
}

async function getplayslisttracks(name,id)
{
    const tracks  = await spotifyapi.getPlaylistTracks(id,{
        offset : 1,
        limit : 5,
        fields : 'items'
    })

    for(let data of tracks.body.items)
    {
        console.log(data.track.name+" ");
        console.log(data.track.href);
    }
}

async function getplaylists()
{
    const playlist = await spotifyapi.getPlaylist("4mn7A7i3b3SD3ABMyBGkL0").then((data)=>{
        console.log(data);
    }).catch(err=>{
        console.log(err);
    })

}
async function getsongs()
{
    const song = await spotifyapi.getMyTopTracks({
        offset : 1,
        limit : 6
    }
   
    )
    console.log(song)
}
getmydata();