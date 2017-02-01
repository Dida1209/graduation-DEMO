$(function(){
	console.log($('.media-body #reply').length);
	$('.media-body #reply').click(function(e){
		console.log(this);
		$(this).find("form").toggle();
	})
	//console.log($('.media-body #reply #replyForm').length);
	$('form').click(function(e){
		e.stopPropagation();
	})
})