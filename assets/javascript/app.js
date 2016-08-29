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
//    var startAt=2000;
//         var number = startAt;

//         // When the stop button gets clicked, run the stop function.
//         $('#stop').on('click', stop);
//         // When the resume button gets clicked, execute the run function.
//         $('#resume').on('click', run);
//         $('#reset').on('click', reset);

//         // The run function sets an interval
//         // that runs the decrement function once a second.
//         // Notice how we name the interval "counter."
//         function displayNumber(){
//             $('#show-number').html('<h2>' + number + '</h2>');

//         }

//         function run(){
//             counter = setInterval(decrement, 1000);
//         }

//         function reset() {
//             number=startAt;
//             displayNumber();
//         }

//         // The decremeent function.
//         function decrement(){
//             // Decrease number by one.
//             number--;
//             // Show the number in the #show-number tag.
//             displayNumber();
//             // Once number hits zero...
//             if (number === 0){
//                 // ...run the stop function.
//                 stop();
// //                number=10;
//                 // Alert the user that time is up.
//                 alert('Time Up!')
//             }
//         }

//         // The stop function
//         function stop(){
//             // Clears our "counter" interval.
//             // We just pass the name of the interval
//             // to the clearInterval function.
//             clearInterval(counter);
//         }

//         // Execute the run function.
//         run();

// question1: function(){
// var question1 = "We are the ...";
// var answers = ["Crystal Gems", "Champions", "World", "99%"];
// var answer = "Crystal Gems";
// for (var i = 0; i<answers.length; i++) {
// 	Things[i]
// }
// if $('.button').click(answers[0])
//     console.log(Correct!);
// } else {
//     console.log(Whoops!);
// }

// question2: function(){
// var question2 = "Steven cannot do which one:";
// var answers = ["Generate cats", "Float", "Heal", "train Lion"];
// var answer = "train Lion";
// for (var i = 0; i<answers.length; i++) {
//     Things[i]
// }
// if $('.button').click(answers[0])
//     console.log(Correct!);
// } else {
//     console.log(Whoops!);
// }

// question1: function(){
// var question1 = "We are the ...";
// var answers = ["Crystal Gems", "Champions", "World", "99%"];
// var answer = "Crystal Gems";
// for (var i = 0; i<answers.length; i++) {
//     Things[i]
// }
// if $('.button').click(answers[0])
//     console.log(Correct!);
// } else {
//     console.log(Whoops!);
// }