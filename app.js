var express = require('express');
var request = require("request");
var request2 = require("request");

var app = express();
var listOfMovies = [];
//var result;
app.get('/popcornMe', function(req, res, params){
  acceptRequest(req, res, params);
});

const acceptRequest = async function(req, res, params){
  var popcornPerMinute = {small: 0.72, medium: 1.17, large: 2.28};
  var allMovieResults;
  var url = "https://api.themoviedb.org/3/search/movie?query="+ req.query.name+"&api_key=a70897383462e6afe1e4d34f9ddd2cb8";
  //var url2 = "http://www.omdbapi.com/?apikey=beb75800&t="+req.query.name;
  request({
      url: url,
      json: true
  }, function getMovies(error, response, body) {

      if (!error && response.statusCode === 200) {
          allMovieResults = body.results;
          for (var i = 0; i < allMovieResults.length; i++) {
            var url4 = "https://api.themoviedb.org/3/movie/"+allMovieResults[i].id+"?api_key=a70897383462e6afe1e4d34f9ddd2cb8";
            let movieRuntime = getRuntime(allMovieResults[i].id);
            var movie = new Movie(allMovieResults[i].id, allMovieResults[i].title, allMovieResults[i].overview, movieRuntime);
            console.log(movie);
            listOfMovies.push(movie);
          }
    }
res.json(body);
})
}

function Movie(id, title, overview, runtime){
  this.id = id;
  this.title = title;
  this.overview = overview;
  this.runtime = runtime;
}

Movie.prototype.setRuntime = function(runt) {
    this.runtime = runt;
};

function getRuntime(movieID){
      var url = "https://api.themoviedb.org/3/movie/"+movieID+"?api_key=a70897383462e6afe1e4d34f9ddd2cb8";
      var runtimeResult;
     request2({
        url: url,
        json: true
    }, readRuntime)};

    function readRuntime(error, response, body) {
        if (!error && response.statusCode === 200) {
            runtimeResult = body.runtime;
            console.log(resulter);
            //return resulter;
        }
        //console.log(resulter);
        return runtimeResult;
};

app.listen(3003);
