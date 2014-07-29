/* A Simple Quiz; a project from javascriptissexy.com's "How to Learn JavaScript Properly" course.
 */
$(function (){
    var firstUser ="";
    var selectedAnswer = [];
    var i =0;
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    } //setCookie and getCookie source http://www.w3schools.com/js/js_cookies.asp
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
    function User(theName, thePassword){ /*User function and methods variation of code from http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/ */
        this.name = theName;
        this.password=thePassword;
        this.score=0;
    }

    User.prototype = {
        constructor: User,
        showNameAndScores: function() {
        return "<h1>" + this.name + "Scores: " + this.score + "</h1>";
        }
    };
    $("h2").after('<p id="error">Error: Your username and password must be at least 5 characters long each!</p>');
    var errorMessage = $("#error");
    errorMessage.hide();
    if(document.cookie.length !== 0) {
        $(".form-signin").remove();
        $(".questions").show(200);
        var name = document.cookie.split("=")[0];
        $(".questions").append('<p id="welcome"> Welcome ' + name + '!</p>')
        $("#welcome").css({"fontFamily": "sans-serif", "color": "#A37B0D", "font-size": "1.5em","margin-top": "50px"});
    }
    else {
        $(".questions").hide();
        $(".form-signin").submit(function (event) {
            var user = $("#username").val();
            var pswd = $("#password").val();
            firstUser = new User(user, pswd);
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

    var allQuestions = {myQuestions: []};
    var Q0 = new Question("Which country won the 2014 World Cup?", ["USA", "Brazil", "Holland", "Germany"], 3); //could I create a 'factory function' that creates assigns the next variable to the newly created function??
    var Q1 = new Question("Which book is by Charlotte Bronte?", ["Wuthering Heights", "The Professor", "Middlemarch", "Bleak House"], 1);
    var Q2 = new Question("Which group was in charge of Democratic Kampuchea in the 1970s?", ["The Viet-Cong", "The Khmer Rouge", "United Nations", "FUNK"], 1);
    var Q3 = new Question("According to John Donne, for whom does the bell toll?", ["The bell tolls for John Donne's wife", "The bell tolls for Jesus Christ", "The bell tolls for thee", "The bell tolls for Duke Valentino"], 2);
    allQuestions.myQuestions.push(Q0, Q1, Q2, Q3);
    var qLength = allQuestions.myQuestions.length;
function loadQuestion(){
    $("h1").remove();
    $("li").remove();
    $("input.choice").remove();
     Handlebars.registerHelper('list', function (items, options) {
       if(options.fn(items[i]))
         {
             var theQ = options.fn(items[i]);
             return theQ;
         }
     });
     var theTemplateScript = $("#choices").html();
     var theTemplate = Handlebars.compile(theTemplateScript);
     $("#question").append(theTemplate(allQuestions));
    if (i == allQuestions.myQuestions.length-1) {
        $("#next").hide();
        $("#calculate").show();
    }
 }
$("#calculate").hide();
$("#msg").hide();
loadQuestion();
$("#next").on('click',
    function() {
        if($("input:checked").val()) {
            $("#msg").hide();
            selectedAnswer[i] = $("input:checked").val();
            if (i >= 0 && i < allQuestions.myQuestions.length - 1) {
                i++;
                loadQuestion();
                var a = selectedAnswer[i];
                if($('input:radio[name=choice]')[a])
                {
                    $('input:radio[name=choice]')[a].checked = true;
                }
            }
        }
        else $("#msg").show();
    });
$("#back").on('click',
    function(){
        $("#calculate").hide();
        $("#next").show();
        if(i>0 && i<=(qLength-1)) {
            i--;
            loadQuestion();
            var a = selectedAnswer[i];
                $('input:radio[name=choice]')[a].checked = true;
        }
    });
$("#calculate").on('click', function(){
    var score=0;
    if($("input:checked").val()){
        for(var j=0; j<qLength; j++) {
            if (selectedAnswer[j] == allQuestions.myQuestions[j].correctAnswer) {
                score++;
                }
            }
        $("#msg").hide();
        $(".buttons").remove();
        $("#question").replaceWith("<h1>" + firstUser.name + ", you scored " + score + " out of " + qLength + ".</h1>");
        }
    else $("#msg").show();
    })
});
/**
 * Created by Una on 6/21/2014.
 */