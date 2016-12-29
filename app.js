/*global $*/

var very = [];

var index = 0;
var round = 1;
var dataObj = {};

var done = false;
var started = false;

$.ajax({
    url:      'values.json',
    dataType: 'json',
    success:  function(data) {
        dataObj = data.values;

        $('#btn_start').text('Start');

        $('#btn_start').prop('disabled', false);

        $('#lbl_valuesLeft').text(dataObj.length - index)
    }
});

var finishEarly = function() {
    $('#btn_very').prop('disabled', true);
    $('#btn_middle').prop('disabled', true);
    $('#btn_not').prop('disabled', true);

    done = true;
    $('#btn_start').text('Again!')



    if (very.length > 0) {
        $('#value').hide();
        $('#description').hide();
        $('#lbl_top').text('Your top values are...');
        for (i in very) {
            
            $('#many_values').append('<h5 class="early_value">Value ' + (+i + 1) + '</h5>');
            $('#many_values').append('<h2>' + very[i].value + '</h2>');
            $('#many_values').append('<h3>' + very[i].description + '</h3>');
        }
    } else {
        $('#value').text('No important values? :(');
        $('#description').text('Try again!');
    }

        
        $('#many_values').show(300);
        $('#lbl_top').show(300);
        $('.labels').addClass('border');
        $('.share').show(300);

};

$('#btn_start').click(function() {
    if (done) {
        location.reload();
    } else if (started) {
        finishEarly();
    } else {
        $('.labels').animate({
            opacity: 0
        }, 300, function() {
            // disable buttons
            $('#btn_very').prop('disabled', false);
            $('#btn_middle').prop('disabled', false);
            $('#btn_not').prop('disabled', false);

            $('.buttons').addClass('colored');

            updateScreen();

            // $('#btn_start').prop('disabled', true);
            $('#btn_start').text('Finish');

            $('.labels').animate({
                opacity: 1
            }, 300);

            started = true;
        });
    }
});

$('#btn_very').click(function() {
    very.push(dataObj[index]);
    increment();
});
$('#btn_middle').click(function() {
    increment();
});
$('#btn_not').click(function() {
    increment();
});

var increment = function(data) {
    index++;

    $('.labels').animate({
        opacity: 0
    }, 300, function() {
        $('.labels').animate({
            opacity: 1
        }, 300);
        shouldReset();

        $('#lbl_valuesLeft').text(dataObj.length - index);
    });


};

var shouldReset = function() {
    if (index == dataObj.length) {
        if (very.length == 0) {
            // disable buttons
            $('#btn_very').prop('disabled', true);
            $('#btn_middle').prop('disabled', true);
            $('#btn_not').prop('disabled', true);

            $('#btn_start').text('Again');
            $('#btn_start').prop('disabled', false);

            $('#value').text('No important values? :(');
            $('#description').text('Try again!');

            done = true;
        } else if (very.length == 1) {
            $('#value').text(very[0].value);
            $('#description').text(very[0].description);

            // disable buttons
            $('#btn_very').prop('disabled', true);
            $('#btn_middle').prop('disabled', true);
            $('#btn_not').prop('disabled', true);

            $('#btn_start').text('Again');
            $('#btn_start').prop('disabled', false);

            $('#lbl_top').show(300);
            $('.share').show(300);

            $('.labels').addClass('border');

            done = true;
        } else {
            dataObj = very;
            index = 0;
            
            very = [];

            round++;
            $('#lbl_round').text(round);

            updateScreen();
        }
    } else {
        updateScreen();
    }
};

var updateScreen = function() {
    $('#value').text(dataObj[index].value);
    $('#description').text(dataObj[index].description);
};

$('#btn_help').click(function() {
    $('#txt_help').toggle(300);
    if ($("#txt_help").is(':visible')) {
        $("html, body").animate({scrollTop: $("#txt_help").offset().top});
    }
});

