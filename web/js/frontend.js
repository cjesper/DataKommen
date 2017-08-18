// @flow
/*
    ExamChecker frontend
    Handles hash_change and subscriptions
    Jesper Carlsson, 2017
*/ 
var wsuri = "ws://localhost:8080/ws";
var connection = new autobahn.Connection({
    url : wsuri,
    realm: "realm1"
});

window.onload = location_hash_changed();

window.addEventListener('hashchange', function () {
    location_hash_changed();
}, false );

function location_hash_changed () {
    var hash = location.hash;

    var newHash = hash.split('#')[1];
    if (newHash) {
        console.log(newHash);
    } else {
        console.log("No hash"); 
    }
    // If we have a hash, go to that course 
    if (newHash) {
            $(function () { 
                document.getElementById('welcomeRow').style.display = "none";
                document.getElementById('infoRow').style.display = "none";
                document.getElementById('contentRow').style.display = "block";
            });
    } else { //Else display default page
            $(function () { 
                document.getElementById('welcomeRow').style.display = "block";
                document.getElementById('infoRow').style.display = "block";
                document.getElementById('contentRow').style.display = "none";
            });
    }
} 

connection.onopen = function (session, details) {
    console.log("Connected in frontend!"); 
    
    session.subscribe("on_answer_from_backend", on_answer_from_backend).then(
            function (sub) {
                console.log("Subscribed to on_answer_data"); 
            },
            function (err) {
                console.log("Failed to subscribe to on_answer_data"); 
            }
        );  

    session.subscribe("on_new_question_from_backend", on_new_question_from_backend).then(
            function (sub) {
                console.log("Subscribed to on_new_question_from_backend"); 
            },
            function (err) {
                console.log("Failed to subscribe to on_new_question_from_backend"); 
            }
    );  
}  

/* Display new question when we get it from backend */
var on_new_question_from_backend = function (questionData) {
    console.log("Recieved a new question for display");
    var newQuestion = questionData[0].content;
    document.getElementById('theQuestion').innerHTML = newQuestion;
} 

/* Display answer when we get it from backend */
var on_answer_from_backend = function (answerData) {
    console.log("Recieved an answer!");
    console.log(answerData);
} 


