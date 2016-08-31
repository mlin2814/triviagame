window.onload = function(){
    $('#stop').on('click', stopwatch.stop);
    $('#reset').on('click', stopwatch.reset);
    $('#start').on('click', stopwatch.start);
};

// Our stopwatch object
var stopwatch = {
    time:1200,
    reset: function(){
        stopwatch.time = 0;
        $('#display').html('20:00');
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

var start = 0;
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    displayStart();
    $(this).find(".instructions").hide();

    $(this).find(".nextButton").on("click", function (){
        $(document).find(".nextButton").text("Next Question");
    });
    
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

// var startScreen = (function(input) {

//     // the red component of rgb
//     var hue = 0; 
//     // are we moving toward red or black?
//     var direction = 1; 
//     var transitioning = false;

//     // record the input state from last frame
//     // because we need to compare it in the
//     // current frame
//     var wasButtonDown = false;

//     // a helper function
//     // used internally to draw the text in
//     // in the center of the canvas (with respect
//     // to the x coordinate)
//     function centerText(ctx, text, y) {
//         var measurement = ctx.measureText(text);
//         var x = (ctx.canvas.width - measurement.width) / 2;
//         ctx.fillText(text, x, y);
//     }
    
//     // draw the main menu to the canvas
//     function draw(ctx, elapsed) {
        
//         // let's draw the text in the middle of the canvas
//         // note that it's ineffecient to calculate this 
//         // in every frame since it never changes 
//         // however, I leave it here for simplicity
//         var y = ctx.canvas.height / 2;
        
//         // create a css color from the `hue`
//         var color = 'rgb(' + hue + ',0,0)';
        
//         // clear the entire canvas
//         // (this is not strictly necessary since we are always
//         // updating the same pixels for this screen, however it
//         // is generally what you need to do.)
//         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//         // draw the title of the game
//         // this is static and doesn't change
//         ctx.fillStyle = 'white';
//         ctx.font = '48px monospace';
//         centerText(ctx, 'My Awesome Game', y);

//         // draw instructions to the player
//         // this animates the color based on the value of `hue`
//         ctx.fillStyle = color;
//         ctx.font = '24px monospace';
//         centerText(ctx, 'click to begin', y + 30);
//     }

//     // update the color we're drawing and
//     // check for input from the user
//     function update() {
//         // we want `hue` to oscillate between 0 and 255
//         hue += 1 * direction;
//         if (hue > 255) direction = -1;
//         if (hue < 0) direction = 1;
        
//         // note that this logic is dependent on the frame rate,
//         // that means if the frame rate is slow then the animation
//         // is slow. 
//         // we could make it indepedent on the frame rate, but we'll 
//         // come to that later.

//         // here we magically capture the state of the mouse
//         // notice that we are not dealing with events inside the game
//         // loop.
//         // we'll come back to this too.
//         var isButtonDown = input.isButtonDown();

//         // we want to know if the input (mouse click) _just_ happened
//         // that means we only want to transition away from the menu to the
//         // game if there _was_ input on the last frame _but none_ on the 
//         // current one.
//         var mouseJustClicked = !isButtonDown && wasButtonDown;

//         // we also check the value of `transitioning` so that we don't 
//         // initiate the transition logic more the once (like if the player
//         // clicked the mouse repeatedly before we finished transitioning)
//         if (mouseJustClicked && !transitioning) {
//             transitioning = true;
//             // do something here to transition to the actual game
//         }

//         // record the state of input for use in the next frame
//         wasButtonDown = isButtonDown;
//     }

//     // this is the object that will be `startScreen`
//     return {
//         draw: draw,
//         update: update
//     };

// }());
