var Comment=require('../models/comment');
var Movie=require('../models/movie');

exports.save=function(req,res) {
	var _comment=req.body.comment;
	var movieId=_comment.movie;
	var comment=new Comment(_comment);
	//console.log('*****************comment is___'+_comment);
	comment.save(function(err,comment){
		if(err){
			console.log(err);
		}
		res.redirect('/movie/'+movieId);
	})
}