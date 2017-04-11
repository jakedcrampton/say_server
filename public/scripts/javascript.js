var text;
var option;
$(document).ready(function() {

    $.get('/users', {}, function success(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#drop").append(data[i]);
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
