/*
    ExamChecker frontend
    Jesper Carlsson, 2017
*/ 
var wsuri = "ws://localhost:8080/ws";
var connection = new autobahn.Connection({
    url : wsuri,
    realm: "realm1"
});

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
on_new_question_from_backend = function (questionData) {
    console.log("Recieved a new question for display");
    var newQuestion = questionData[0].content;
    theQuestion.innerHTML = newQuestion;
} 

/* Display answer when we get it from backend */
on_answer_from_backend = function (answerData) {
    console.log("Recieved an answer!");
    console.log(answerData);
} 

/* Open the connection */  
connection.open();
