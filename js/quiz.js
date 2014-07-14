/* A Simple Quiz; a project from javascriptissexy.com's "How to Learn JavaScript Properly Course"
 Built with JavaScript and jQuery.
 Tested in Chrome Version 35.0.1916.153 m, IE11, and Firefox 29.0.1
 User is allowed to go back and change answers before submitting the quiz.
 */
$(function (){
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    } //setCookie and getCookie code source w3schools.com
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    }
    $("h2").after('<p id="error">Error: Your username and password must be at least 5 characters long each!</p>');
    var errorMessage = $("#error");
    errorMessage.hide();
    if(document.cookie.length !== 0) {
        $(".form-signin").remove();
        $(".questions").show(200);
        var name = document.cookie.split("=")[0];
        $(".questions").append('<p id="welcome"> Welcome ' + name + '!</p>');
    }
    else {
        $(".questions").hide();
        $(".form-signin").submit(function (event) {
            var user = $("#username").val();
            var pswd = $("#password").val();
            errorMessage.hide();
            if (user && pswd) {
                if (user.length < 5 || pswd.length < 5) {
                    event.preventDefault();
                    errorMessage.show(0);
                    errorMessage.css({color: "red"});

                }
                else {
                    event.preventDefault();
                    localStorage.setItem(user, pswd);
                    $(".form-signin").remove();
                    setCookie(user, pswd, 1000);
                    $(".questions").show(200);
                }
            }
            else return false;
        });
    }
    function Question(theQuestion, theChoices, theCorrectAnswer) {
        this.question = theQuestion;
        this.choices = theChoices;
        this.correctAnswer = theCorrectAnswer;
    }
    var counter = 0;
    Question.prototype.loadQuestion = function() {
        $("#question").text(this.question);
        counter++;
    };
    var allQuestions = [];
    var Q0 = new Question("Which country won the 2014 World Cup?", ["USA", "Brazil", "Holland", "Germany"], 3);
    var Q1 = new Question("Which book is by Charlotte Bronte?", ["Wuthering Heights", "The Professor", "Middlemarch", "Bleak House"], 1);
    allQuestions.push(Q0);
    allQuestions.push(Q1);/*could add Add to Array as method of Question, then loop through all the questions and invoke add to Array...*/
    $("button").on('click', function() {
        var newLoadQ = allQuestions[counter].loadQuestion.bind(allQuestions[counter])
        newLoadQ();

    });






})();
/**
 * Created by Yuna on 6/21/2014.
 */