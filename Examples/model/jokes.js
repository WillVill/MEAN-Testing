var jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];

function _getRandomJoke(){
    return jokes[Math.floor(Math.random()*jokes.length)];
}
function _addJoke(joke){
    jokes.push(joke);
}

function _deleteJoke(){
    jokes.splice(jokes.length-2,jokes.length-1);
}

function _editJoke(joke){
    jokes[joke.length-1] = joke;
}
module.exports = {
    allJokes : jokes,
    getRandomJoke : _getRandomJoke,
    addJoke : _addJoke,
    editJoke: _editJoke,
    deleteJoke: _deleteJoke
}