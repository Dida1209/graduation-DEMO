var express = require('express');  //加载express
var port = process.env.PORT || 4000;  //设置端口  环境端口 或 4000端口
var app = express();           //启动一个web服务器  将这个实例赋给一个变量app
var path = require('path');              //path可以为静态资源定义地址
var bodyParser=require('body-parser');
var _=require('underscore');

var mongoose=require('mongoose');  //调用mongoose连接数据库
var Movie=require('./models/movie');//取出model下的movie模型

mongoose.connect('mongodb://localhost/demo');  //连接到本地数据库

app.set('views','./views/pages');     //设置视图根目录
app.set('view engine','jade');        //设置默认的模板引擎
app.use(express.static(path.join(__dirname,'public')));    //静态资源所在的目录  path.join可以添加多个参数，把这些目录拼接起来
app.use(bodyParser.urlencoded({ extended: true }));  //express的bodyParser的方法能把提交表单的数据格式化

app.locals.moment=require('moment');
app.listen(port);                         //监听端口

console.log('demo is started '+port);        //在服务台打印一行日志

//index	page  在express里编写路由是简单的
app.get('/',function(req,res){  //直接调用express的get方法，因此浏览器访问这个页面都是用get方法提交这个请求的
	                            //get里有两个参数，一个是路由的编写规则，一个是回调方法
	                            //回调方法里会在诸如两个方法，一个是request，一个是respond
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
})

app.get('/movie/:id',function(req,res){   //因为url中的id 所以可以利用req.params.id取出
	var id=req.params.id;

	Movie.findById(id,function(err,movie){
		res.render('detail',{
			title:'demo'+ movie.title,
			movie:movie
		})
	})
})

app.get('/admin/movie',function(req,res){  
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
})

//list列表页按更新时跳转到后台页，并且把后台页的数据初始化
app.get('/admin/update/:id',function(req,res){
	var id=req.params.id;

	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'demo 后台更新页',
				movie:movie
			})
		})
	}
})

//admin post movie 拿到从后台录入页post过来的数据
app.post('/admin/movie/new',function(req,res){
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
})


app.get('/admin/list',function(req,res){
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
})

//app.use(express.static(path.join(__dirname, '/public')));
//视频网址：http://player.hunantv.com/mgtv_v5_main/main.swf?b/298050/cxid=95kqkw8n6&js_function_name=vjjFlash&video_id=3726416&statistics_bigdata_bid=1&cpn=1
//图片地址：https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484916496040&di=dacb2dece0941423cbd9bb54f3a7053a&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201601%2F03%2F20160103085338_eyBCL.jpeg



//list delete movie
app.delete('/admin/list',function(req,res){
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
})