var timeleft = 31;
var downloadTimer = setInterval(function(){
    $("#display").text(--timeleft);
    if(timeleft <= 0) clearInterval(downloadTimer);
},1000);

$("#question_div").hide();
$(".correct").hide();
$(".incorrect").hide();



$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    _t.questions = [{
        question: "Which of these dog breeds was used as the Chinese emperors' last line of defense.",
        choices: ["Goldendoodle", "Chinese Crested", "Pekingese", "Doberman"],
        images: [""],
        correct: 2
    }, {
        question: "Dogs have two cones in their eyes, which enables them to only see 2 colors on a scale. Which two colors are on that scale?",
        choices: ["Red and Green", "Blue and Yellow", "Pink and Purple", "Black and White"],
        correct: 1

    }, {
        question: "If a dog is not spayed or neutered. A dog, her mate and their offspring can produce how many dogs within a span of six years?",
        choices: ["25000", "400", "1,500", "66,000"],
        correct: 3

    }, {
        question: "Up to how many words and gestures can a dog understand?",
        choices: ["26", "250", "500", "1000"],
        correct: 1

    }, {
        question: "Which dog breed is considered to be the most intelligent?",
        choices: ["Border Collie", "Pug", "Australian Shepherd", "Chihuaua"],
        correct: 0

    }, {
        question: "How fast can a greyhound run?",
        choices: ["54.8 mph", "32.5 mph", "43.5 mph.", "65.7 mph"],
        correct: 2

    }, {
        question: "How many times does the Holy Bible mention dogs?",
        choices: ["40", "4", "14", "26"],
        correct: 2

    }, {
        question: "What is the most popular dog name in the world?",
        choices: ["Stella", "Luna", "Jack", "Max"],
        correct: 3
    }];
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#question_div").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>').addClass("answers");
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function() {
                _t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
        }, 1000)
    };
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $("#question_div").show();
    $(".correct").show();
    $(".incorrect").show();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        _t.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        _t.answer(true);
    }
    _t.nextQ();
});