var text;
var option;
$(document).ready(function() {

    $.get('/users', {}, function success(results) {
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var optionString = '<option value=\"' + results[i].user_id + '\">' + results[i].name + '</option>';

            $("#drop").append(optionString);
        }
    });



    $("#form").submit(function(event) {
        event.preventDefault();
        text = $("#textbox").val();
        option = $("#drop").val();
        $.post("/", {
            voice: option,
            text: text
        }, function success(data) {
            console.log(data);
        });

        console.log(text);
        console.log(option);
    });
})
