var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");


router.get('/joke/random', function(req, res, next) {
    res.send({joke: jokes.getRandomJoke()})
});

router.get('/jokes', function(req, res, next) {
    res.send({jokes: jokes.allJokes})
});

router.post('/joke', function(req, res, next) {
    var joke = req.body;
    console.log(JSON.stringify(joke));
    jokes.addJoke(joke.joke);
    res.json({joke: joke})
});

router.delete('/delete', function(req, res, next){
    jokes.deleteJoke();
    res.json({jokes: jokes.allJokes})
})

router.put('/edit', function(req, res, next){
    var joke = req.body;
    jokes.editJoke(joke.joke);
    res.json({jokes: jokes.allJokes})
})
module.exports = router;