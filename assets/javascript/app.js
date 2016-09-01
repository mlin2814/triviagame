window.onload = function(){
    $('#stop').on('click', stopwatch.stop);
    $('#reset').on('click', stopwatch.reset);
    $('#start').on('click', stopwatch.start);
};

// Our stopwatch object
var stopwatch = {
    time:1320,
    reset: function(){
        stopwatch.time = 1320;
        $('#display').html('22:00');
    },
    start: function(){
        counter = setInterval(stopwatch.count, 1000);
    },
    stop: function(){
        clearInterval(counter);
    },
    count: function(){
        stopwatch.time--;
        if (stopwatch.time < 0){
            return;
        }
        var converted = stopwatch.timeConverter(stopwatch.time);
        $('#display').html(converted);
    },
    timeConverter: function(t){
        var minutes = Math.floor(t/60);
        var seconds = t - (minutes * 60);
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        if (minutes === 0){
            minutes = "00";
        } else if (minutes < 10){
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }

};



var questions = [{
    question: "We are the ...",
    choices: ["Crystal Gems", "Champions", "World", "99%"],
    correctAnswer: 0
}, {
    question: "Steven cannot do which of the following?",
    choices: ["Generate cats", "Float", "Heal", "Train Lion"],
    correctAnswer: 3
}, {
    question: "Do Gems need to eat food?",
    choices: ["Yes", "No"],
    correctAnswer: 1
}, {
    question: "Who leads the Homeworld Gems?",
    choices: ["Jasper", "Rose Quartz", "The Diamonds", "Onion"],
    correctAnswer: 2
}, {
    question: "What is the show Steven likes to watch?",
    choices: ["Crying Breakfast Friends", "Adventure Time", "Invader Zim", "Hannah Montana"],
    correctAnswer: 0
}, {
    question: "Connie cannot do which of the following?",
    choices: ["Play violin", "Swordfight", "Breathe under water", "Read"],
    correctAnswer: 2
}, {
    question: "Who is not based off of an actual gem?",
    choices: ["Garnet", "Amethyst", "Pearl", "Lapis"],
    correctAnswer: 2
}, {
    question: "Amethyst came from...",
    choices: ["Homeworld", "the Kindergarten", "Galaxy Warp", "Paradise Island"],
    correctAnswer: 1
}, {
    question: "How thirsty is Pearl?",
    choices: ["Hydrated", "A Little", "Desert", "Spongebob in Sandy's Dome without a helmet"],
    correctAnswer: 3
}, {
    question: "Steven's weapon(s) are...",
    choices: ["A shield", "A sword", "A bubble", "All of the above"],
    correctAnswer: 3
}];

var start = 0;
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {
    stopwatch.start();
     
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {           
            value = $("input[type='radio']:checked").val();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
$('#nextButton').on('click', function() {
        stopwatch();
    });
});

function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);

    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}