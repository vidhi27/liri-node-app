require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArgs = process.argv;
var command = nodeArgs[2];


// TWITTER

function myTweets(){
    var params = {screen_name: 'VP28688141'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~" + '\n' +
                "Here are the 20 most recent tweets from my timeline.."
            );
            for(var i = 0; i < 20; i++){
                console.log("=========================" + '\n' +
                    'Tweet: ' + tweets[i].text + '\n' +
                    'Time of tweet: ' + tweets[i].created_at
                );
            }
        }
    });
}

// SPOTIFY

function spotifySong(input){
    var songName = '';

    if(nodeArgs.length > 3){
        for(var i = 3; i < nodeArgs.length; i++){
            if(i > 3){
                songName = songName + ' ' + nodeArgs[i];
            } else {
                songName += nodeArgs[i];
            }
        }
    } else if(input){
        songName = input;
    } else {
        songName = 'The Sign ace of base';
    }

    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songInfo = data.tracks.items[0];
        var artistInfo = songInfo.artists[0];
        var albumInfo = songInfo.album;

        var spotifyInfo = [
            'Artist: ' + artistInfo.name,
            'Song Name: ' + songInfo.name,
            'Album Name: ' + albumInfo.name,
            'Preview Link: ' + songInfo.preview_url,
            'Open Spotify Link: ' + songInfo.external_urls.spotify
        ].join('\n');

        appendToLog(spotifyInfo);

        console.log("=========================" + '\n' +
            spotifyInfo + '\n' +
            "========================="
        );
    });
};

// OMDB

function omdbMovie(){
    var movieName = '';

    if(nodeArgs.length >= 4){
        for(var i = 3; i < nodeArgs.length; i++){
            if(i > 3){
                movieName = movieName + '+' +nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }
    } else {
        movieName = 'mr+nobody';
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);

            var movieInfo = [
                'Title: ' + movie.Title,
                'Release year: ' + movie.Year,
                'IMDB Rating: ' + movie.Ratings[0].Value,
                'Rotten Tomatoes Rating: ' + movie.Ratings[1].Value,
                'Country: ' + movie.Country,
                'Language: ' + movie.Language,
                'Plot: ' + movie.Plot,
                'Actors: ' + movie.Actors
            ].join('\n');
            appendToLog(movieInfo);
            console.log("=========================" + '\n' +
                movieInfo + '\n' +
                "========================="
            );
        }
    });
};

// DO WHAT IT SAYS

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        } else {
            var dataArr = data.split(',');
            command = dataArr[0];
            input = dataArr[1];
            checkSwitch(command, input);
        }
    });
};

// APPEND TO LOG.TXT FUNCTION

function appendToLog(dataLog){
    var divider = "\n===================================\n\n";
    fs.appendFile("log.txt", dataLog + divider, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("log.txt was updated!");
    });
}
// USER COMMAND LISTENER

function checkSwitch(command,input){
    switch(command){
        case "my-tweets":
            myTweets();
        break;
        case "spotify-this-song":
            spotifySong(input);
        break;
        case "movie-this":
            omdbMovie();
        break;
        case "do-what-it-says":
            doWhatItSays();
        break;
        default:
        console.log('=========================' + '\n' +
            'Please type a proper command.' + '\n' +
            'my-tweets' + '\n' +
            'spotify-this-song <song name here>' + '\n' +
            'movie-this <movie name here>' + '\n' +
            'do-what-it-says' + '\n' +
            '========================='
        );
    }
}

// RUN THE APP

checkSwitch(command);
