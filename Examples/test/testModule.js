var expect = require("chai").expect;
var http = require("http");
var app = require('../app');
var request = require("request"); //Simple way to make HTTP calls
var nock = require("nock");
var mockJoke = require("../mocking/jokes")
var server;
var TEST_PORT = 3456;


///API TEST

before(function(done){
    var app = require('../app');
    server = http.createServer(app); server.listen(TEST_PORT,function(){
        done(); 
    });
});
after(function(done){
    server.close();
    done();
});


describe("POST: ", function () { 
    var options = 
    {
        url: "http://localhost:" + TEST_PORT + "/api/joke", 
        method: "POST",
        json: true,
        body: {joke: "Funny joke to be persisted to db"}
    }
    it("Get a joke", function (done) { 
        request(options, function (error, res, body) {
            var addedJoke = body.joke;
            expect(addedJoke.joke).to.be.equal("Funny joke to be persisted to db"); //You should also check whether the joke actually was added to the Data-store done();
            done();
        });
        
    })
});


describe('persistence', function () {
    var options = 
    {
        url: 'http://localhost:' + TEST_PORT + '/api/jokes',
        method: 'GET',
        json: true
    };
    it('Get list of all jokes', function (done) {
        request(options, function (err, res, body) {
            var jokesList = body;
            var testJoke = jokesList.jokes[3];
            expect("Funny joke to be persisted to db").to.be.equal(testJoke); 
            done(); 
        });
    });
});

describe('editting', function () {
    var options = 
    {
        url: 'http://localhost:' + TEST_PORT + '/api/edit',
        method: 'PUT',
        json: true,
        body: {joke: "Haha, this joke is editted, funny"}
    };
    it('Editting the last joke', function (done) {
        request(options, function (err, res, body) {
            var jokesList = body;
            var testJoke = jokesList.jokes[jokesList.jokes.length-1];
            expect(testJoke).to.be.equal("Haha, this joke is editted, funny");              
            done();
    });
    });
});

describe('deleting', function () {
    var options = 
    {
        url: 'http://localhost:' + TEST_PORT + '/api/delete',
        method: 'DELETE',
        json: true
    };
    it('Deleting the last joke', function (done) {
        request(options, function (err, res, body) {
            var jokesList = body;
            var testJoke = jokesList.jokes[jokesList.jokes.length-1];
            expect(testJoke).to.be.equal(null);              
            done();
    });
    });
});


//---------------------
//MOCKING


var n = nock('http://jokes-plaul.rhcloud.com');
var testJoke = {
    "id": 74,
    "joke": "Wikipedia: I know everything!  \nGoogle: I have everything!  \nFacebook: I know everybody!  \nInternet: Without me you are nothing! \nElectricity: Keep talking bitches!",
    "reference": "http://unijokes.com/it-jokes/"
};


describe('Get joke from mocked db', function () {
    before(function (done) {
        n.get('/api/joke')
            .reply(200,testJoke);
        done();
    });

    it('Get the joke', function (done) {
        mockJoke.getJoke(function (err, joke) {
            if (err) {
                throw err;
            }
            console.log("testJoke: " + testJoke.joke)
            expect(joke.reference).to.be.equal("http://unijokes.com/it-jokes/");
            expect(joke.joke).to.be.eql(testJoke.joke);
            done();
        })
    });
});
