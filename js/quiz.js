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
    $.getJSON("js/allQuestions.json", function(allQuestions) {
        var i = 0;
        var aQ = allQuestions;
        var storeChecked = [];
        /*array that stores the user's answer, triggered by clicking a radio button*/
        $("input:radio[name=choice]").on('click', function () {
            storeChecked[i - 1] = $("input:checked").val();
        });
        var qFunc = {
            nextQ: function () {
                if(i === (aQ.length-1)){
                    $("#next").hide();
                    $("#back").after('<button class="btn-success" id="score">SCORE</button>');
                    $("#score").on('click', function() {
                        if (0 == $('input:radio:checked').length) {
                            $("#msg").css("opacity", "1");
                        }

                        else {
                            $("#msg").css("opacity", "0");
                            var score =0;

                        for (var j = 0; j < aQ.length; j++) {
                        if (storeChecked[j] == aQ[j].correctAnswer) //doesn't work if === is used
                            {score++;}
                            }
                            $(".questions").replaceWith("<h3 class='hero-unit'>You scored " + score + " out of " + aQ.length + ".</h3>");

                        }
                    });
                }
                if (0 !== $('input:radio:checked').length || arguments[0] === 1) { /*arguments[0] === 1 to override qualifcation for checked answer so call to qFunc.nextQ(1) loads first question*/
                    $("#msg").css("opacity", "0");
                    /*hides error message if an answer is selected*/
                    if (storeChecked[i]) { /*if user has already selected a choice for the question we're loading...*/
                        var a = storeChecked[i];
                        $('input:radio[name=choice]')[a].checked = true;
                        /*...check the radio button that was previously chosen*/
                    }
                    else {
                        $("input[name=choice]").attr('checked', false);
                        /*otherwise, uncheck all the radio buttons!*/
                    }
                    $("#question").text(aQ[i].Question).css({opacity: "0"}).fadeTo("slow", 1);
                    /*load the question and answers at array position i*/
                    for (var j = 0; j < 4; j++) {
                        var id = "#" + j;
                        $(id).next("p").text(aQ[i].Choices[j]);
                    }
                    i++;
                } else {
                    $("#msg").css("opacity", "1");
                    /*displays error message if no answer is selected when user clicks Next button*/
                }
                if (i >= 2)$("#back").css("opacity", "1");
            },
                prevQ: function () {
                $("#msg").css({opacity: "0"}) ;
                if($("#score")){$("#score").remove();}
                $("#next").show();
                $("#question").text(aQ[i - 2].Question);
                var a = storeChecked[i - 2];
                $('input:radio[name=choice]')[a].checked = true;
                for (var j = 0; j < 4; j++) {
                    var id = "#" + j;
                    $(id).next("p").text(aQ[i - 2].Choices[j]);
                }
                i--;
            }
        };
        qFunc.nextQ(1);
        $("#next").on('click', qFunc.nextQ);
        $("#back").on('click', qFunc.prevQ);
    });
})();
/**
 * Created by Yuna on 6/21/2014.
 */