var Movie=require('../models/movie');
var Comment=require('../models/comment');
var _=require('underscore');

exports.detail=function(req,res){   //因为url中的id 所以可以利用req.params.id取出
	var id=req.params.id;

	Movie.findById(id,function(err,movie){
		Comment.find({movie:id})
				.populate('from','name')
				.exec(function(err,comments){
					console.log('comments:');
					console.log(comments);
					res.render('detail',{
					title:'demo'+ movie.title,
					movie:movie,
					comments:comments
				})
		})
		
	})
}

exports.new=function(req,res){  
	res.render('admin',{
		title:'demo 后台录入页',
		movie:{
			doctor:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	})	
	//当匹配到/admin/movie时，返回admin.jade页面，并且页面中的变量title：‘demo 后台录入页’
}

exports.update=function(req,res){
	var id=req.params.id;

	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'demo 后台更新页',
				movie:movie
			})
		})
	}
}

exports.save=function(req,res){
	console.log(req.body.inputDoctor);
	var id=req.body.movie._id;                              //如果网站拿过来的数据有id说明，这是更新不是新增的
	var movieObj=req.body.movie;
	var _movie;

	if(id!== 'undefined'){        //如果是更新
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
				console.log(movie);
			}
			_movie=_.extend(movie,movieObj);  //调用underscore的extend方法，目的是用另一个对象的新字段替换原对象里对应的老字段
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movie._id);  //保存更新后，重定向到对应的movie/id页面
			})	
		})
	}
	else{              //如果是一个新对象
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})
		_movie.save(function(err,movie){
				if(err){
					console.log(_movie);
					console.log(err);
					console.log(movie);
				}
				console.log(movie);
				res.redirect('/movie/'+movie._id);
			})	
	}
}

exports.list=function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		else{
			res.render('list',{
				title:'demo'+movies.title,
				movies:movies
			})
		}
	})
}

exports.del=function(req,res){
	var id=req.query.id
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}