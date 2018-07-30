 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
 
 It will retrieve the data by sending requests to the Twitter, Spotify and OMDB APIs.
 
<strong>What Each Command Should Do</strong>

node liri.js <strong>my-tweets</strong>

This will show your last 20 tweets and when they were created at in your terminal/bash window.

node liri.js <strong>spotify-this-song</strong> '<song name here>'

This will show the following information about the song in your terminal/bash window

-Artist(s)
-The song's name
-A preview link of the song from Spotify
-The album that the song is from
*If no song is provided then your program will default to "The Sign" by Ace of Base.

node liri.js <strong>movie-this</strong> '<movie name here>'

This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   
  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

node liri.js <strong>do-what-it-says</strong>
-Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.





