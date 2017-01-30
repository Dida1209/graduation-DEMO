var Comment=require('../models/comment');
var Movie=require('../models/movie');

exports.save=function(req,res) {
	var _comment=req.body.comment;
	var movieId=_comment.movie;
	var comment=new Comment(_comment);
	
	if()

	comment.save(function(err,comment){
		if(err){
			console.log(err);
		}
		res.redirect('/movie/'+movieId);
	})
}