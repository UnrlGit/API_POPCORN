var express = require('express');
var request = require("request");

// tu ti ne trebas requerat dva puta isti package. jednom je dovoljno, to nije instanca vec si samo includao library
// var request2 = require("request");

var app = express();
var listOfMovies = [];

app.get('/popcornMe', function(req, res, params){
  acceptRequest(req, res, params);
});

const acceptRequest = function(req, res, params){
  var popcornPerMinute = {small: 0.72, medium: 1.17, large: 2.28};
  var allMovieResults;
  var url = "https://api.themoviedb.org/3/search/movie?query="+ req.query.name+"&api_key=a70897383462e6afe1e4d34f9ddd2cb8";
  //var url2 = "http://www.omdbapi.com/?apikey=beb75800&t="+req.query.name;
  request({
        url: url,
        json: true
    }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        allMovieResults = body.results;
        for (var i = 0; i < allMovieResults.length; i++) {
            var url4 = "https://api.themoviedb.org/3/movie/"+allMovieResults[i].id+"?api_key=a70897383462e6afe1e4d34f9ddd2cb8";
            var movie = allMovieResults[i];
            listOfMovies.push(new Movie(movie.id, movie.title, movie.overview));
            getRuntime(movie.id)
                .then(function(result) {
                    listOfMovies.forEach(function(m) {
                        if (m.id === movie.id) {
                            m.runtime = result;
                        }
                        console.log(m);
                        
                    })

                })
                .catch(function(error) {
                    // console.log(error);
                })
        }
    }
        res.json(listOfMovies);
    })
}

function Movie(id, title, overview, runtime = null){
  this.id = id;
  this.title = title;
  this.overview = overview;
  this.runtime = runtime;
}

function getRuntime(movieID){
    var url = "https://api.themoviedb.org/3/movie/"+movieID+"?api_key=a70897383462e6afe1e4d34f9ddd2cb8";
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {                
                resolve(body.runtime);
            } else {
                reject(error);
            }
        })
    });
    
};

app.listen(3003);
