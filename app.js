/*global $*/

var very = [];

var index = 0;
var round = 1;
var dataObj = {};

$.ajax({
    url:      'values.json',
    dataType: 'json',
    success:  function(data) {
        dataObj = data.values;
        $('#btn_start').prop('disabled', false);
    }
});

$('#btn_start').click(function() {
    // Reload the page when restarting
    if (very.length > 0) {
        location.reload();
    }

    $('#btn_very').prop('disabled', false);
    $('#btn_middle').prop('disabled', false);
    $('#btn_not').prop('disabled', false);

    updateScreen();
    console.log(dataObj);

    $('#btn_start').prop('disabled', true);
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
    console.log(index);
    console.log(very);
    shouldReset();
};

var shouldReset = function() {
    if (index == dataObj.length) {
        if (very.length == 1) {
            console.log('top value', very[0]);

            $('#btn_very').prop('disabled', true);
            $('#btn_middle').prop('disabled', true);
            $('#btn_not').prop('disabled', true);

            $('#btn_start').text('AGAIN');
            $('#btn_start').prop('disabled', false);
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
