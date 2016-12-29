/*global $*/

var very = [];

var index = 0;
var round = 1;
var dataObj = {};

var done = false;

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

$('#btn_start').click(function() {
    if (done) {
        location.reload();
    }

    $('.labels').animate({
        opacity: 0
    }, 300, function() {
        $('#btn_very').prop('disabled', false);
        $('#btn_middle').prop('disabled', false);
        $('#btn_not').prop('disabled', false);

        updateScreen();

        $('#btn_start').prop('disabled', true);

        $('.labels').animate({
            opacity: 1
        }, 300);
    });
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
})