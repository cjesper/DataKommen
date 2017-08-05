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
    
    session.subscribe("on_answer_data", on_answer_data).then(
            function (sub) {
                console.log("Subscribed to on_answer_data"); 
            },
            function (err) {
                console.log("Failed to subscribe to on_answer_data"); 
            }
        );  
}       

on_answer_data = function (answerData) {
    console.log("Recieved an answer!");
} 

/* Open the connection */  
connection.open();
