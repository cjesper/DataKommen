/*
    Backend-file for ExamChecker
    Jesper Carlsson, 2017
*/
AUTOBAHN_DEBUG = true;
var autobahn = require('autobahn');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Set up connection to autobahn and mongoDB */ 
var connection = new autobahn.Connection({url: 'ws://127.0.0.1:8080/ws', realm: 'realm1'});
mongoose.connect('mongodb://localhost/ExamChecker');

/* Autobahn on-connect */
connection.onopen = function (session) {
    
    console.log("Connected!");
    session.subscribe("on_new_question", on_new_question).then(
            function (sub) {
                console.log("Subscribed to on_new_question");
            },
            function (err) {
                console.log("Failed to subscribe to on_new_question");
            }
        );
} 

/* Handle disconnects */
connection.onclose = function (reason, details) {
    console.log("Connection lost: " + reason);
}
/*------------- END OF INITIALIZATION ---------------- */

/* Schema for questions */
var questionSchema = new Schema({
    title: String,
    subject: String,
    content: String,
    difficulty: String,
    keyWords : [{String}],
});

var questionModel = mongoose.model('question', questionSchema);

/* When a new question is recieved, insert it to the DB */
function on_new_question(question) {
    console.log("Question recieved");
    var questionText = question[0]; //For now we only send a string;
    console.log(questionText);

    questionModel.update(
                    {},
                    {content : questionText},
                    {upsert: true, new: true},
                    function (err, res) {
                        if (!err) {
                            console.log("Added question!");
                            console.log(res);
                        } else {
                            console.log(err.message);
                        }
                    }  
                );
}

connection.open();
