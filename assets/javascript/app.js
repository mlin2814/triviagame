window.onload = function(){
    $('#stop').on('click', stopwatch.stop);
    $('#reset').on('click', stopwatch.reset);
    $('#start').on('click', stopwatch.start);
};

// Our stopwatch object
var stopwatch = {
    time:5,
    reset: function(){
        stopwatch.time = 0;
        // DONE: Change the "display" div to "00:00."
        $('#display').html('20:00');
        // DONE: Empty the "laps" div.
    },
    start: function(){
        // DONE: Use setInterval to start the count here.
        counter = setInterval(stopwatch.count, 1000);
    },
    stop: function(){
        // DONE: Use clearInterval to stop the count here.
        clearInterval(counter);
    },
    count: function(){
        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time--;
        if (stopwatch.time < 0){
            return;
        }

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function, 
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        // DONE: Use the variable you just created to show the converted time in the "display" div.
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
    choices: ["Generate cats", "Float", "Heal", "train Lion"],
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
    choices: ["Play violin", "Swordfight", "Breathe Under Water", "Read"],
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

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {           
            value = $("input[type='radio']:checked").val();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
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


// question1: function(){
// var question1 = ;
// var answers = ;
// var answer = "Crystal Gems";
// for (var i = 0; i<answers.length; i++) {
// 	Things[i]
// }
// if $('.button').click(answers[0])
//     console.log(Correct!);
// } else {
//     console.log(Whoops!);
// }

