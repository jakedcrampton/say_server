var text;
var option;
$(document).ready(function(){
	$("#form").submit(function(event){
		event.preventDefault();
		text=$("#textbox").val();
		option=$("#drop").val();
		$.post( "/", { voice: option, text: text } );

		console.log(text);
		console.log(option);
	});
})
