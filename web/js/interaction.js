// @flow

/*
 * Interaction (buttons and other things) 
 * for ExamChecker
 * Jesper Carlsson, 2017
*/ 

/* Send new question to backend */ 
var sendNewQuestion = function (button) {
    var questionString = document.getElementById("newQuestionArea").value;
    console.log(questionString);
    connection.session.publish('on_new_question', [questionString]);
    return false;
}  

/* Request a new question from the backend */
var requestNewQuestion = function (button) {
    connection.session.publish('on_question_request', []);
    console.log("Requested a question");
}  
