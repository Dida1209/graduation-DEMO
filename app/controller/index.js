var Movie=require('../models/Movie');//取出model下的movie模型

exports.index=function(req,res){		//index	page  在express里编写路由是简单的
	 		//app.get('/',function(req,res){})直接调用express的get方法，因此浏览器访问这个页面都是用get方法提交这个请求的
		                         		//get里有两个参数，一个是路由的编写规则，一个是回调方法
		                         	    //回调方法里会在诸如两个方法，一个是request，一个是respond
		
	console.log('user in session:');
		console.log(req.session.user);
		
		Movie.fetch(function(err,movies){
			if(err){
				console.log(err)
			}
			res.render('index',{
				title:'demo 首页',
				movies:movies         //fetch方法返回的movies
			})
		})
		//当匹配到‘/’后，返回index.jade页面，并把title设为demo首页
}