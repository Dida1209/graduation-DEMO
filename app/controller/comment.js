var Comment=require('../models/comment');
var Movie=require('../models/movie');

exports.save=function(req,res) {
	var _comment=req.body.comment;
	var movieId=_comment.movie;
	
	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			var reply={
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			};
			comment.reply.push(reply);  //回复的处理不需要new Comment，因为是回复某一条评论的，生成评论时，已经new了。
			console.log(reply,comment);
			comment.save(function(err,comment){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movieId);
			})
		})
	}
	else{
		var comment=new Comment(_comment);
		comment.save(function(err,comment){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+movieId);
		})
	}
	
}