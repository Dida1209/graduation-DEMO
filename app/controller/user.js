var User=require('../models/User');

exports.signup=function(req,res){
	var _user=req.body.user;
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log('1'+err);
		}
		if(!user){
			console.log('1001'+Boolean(user)+'1000000'+_user);
			return res.redirect('/');
		}
		else{
			var user=new User(_user);
			user.save(function(err,user){
				if(err){
					console.log('2'+err);
				}else{
					res.redirect('/admin/userlist');
				}
			})
		}
	})
}

exports.signin=function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			console.log('no this one');
			return res.redirect('/');
		}
		else{
			console.log(user);
			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err);
				}
				if(isMatch){
					req.session.user=user;
					console.log('match');
					return res.redirect('/');
				}
				else{
					console.log('no match');
				}
			})
		}
	})
}

exports.logout=function(req,res){
	delete req.session.user;
//	delete app.locals.user;
	res.redirect('/');
}

exports.list=function(req,res){
	var url=req.params.url;
	console.log('req.params     '+url);
	User.fetch(function(err,users){
		if(err){
			console.log('3'+err);
		}else{
			console.log('2002'+users);
			res.render('userlist',{
				title:'用户列表页',
				users:users
			})
		}
	})
}

exports.showUserSignin=function(req,res,next){
	var user=req.session.user;
	if(!user){
		console.log('没登录');
		res.redirect(307,'http://localhost:3000/user/signin');
	}
	next();
}

exports.showUserRole=function(req,res,next){
	var user=req.session.user;
	if(user.role>=10){
		console.log('已登录，有权限');
		//res.redirect('/admin/user/list');
		next();
	}
	else{
		console.log('已登录，没权限');
		res.redirect('/');
	}
}