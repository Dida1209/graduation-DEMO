var express = require('express');  //加载express
var port = process.env.PORT || 4000;  //设置端口  环境端口 或 4000端口
var app = express();           //启动一个web服务器  将这个实例赋给一个变量app
var path = require('path');              //path可以为静态资源定义地址
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var logger=require('morgan');
//var connect=require('connect');

var mongoose=require('mongoose');  //调用mongoose连接数据库
mongoose.Promise=global.Promise;
var mongoStore=require('connect-mongo')(session);
var dbUrl='mongodb://localhost/demo';


mongoose.connect(dbUrl);  //连接到本地数据库

app.set('views','./app/views/pages');     //设置视图根目录
app.set('view engine','jade');        //设置默认的模板引擎
app.use(express.static(path.join(__dirname,'public')));    //静态资源所在的目录  path.join可以添加多个参数，把这些目录拼接起来
app.use(bodyParser.urlencoded({ extended: true }));  //express的bodyParser的方法能把提交表单的数据格式化
app.use(cookieParser());
app.use(session({
	secret:'demo',
	store:new mongoStore({
		url:dbUrl,      //给这个store，demoDB的地址
		collection:'sessions'   //存储的这些session的集合就叫做session，
	})
}))

if(app.get('env')==='development'){
	app.set('showStackError',true);
	app.use(logger('dev'));
	app.locals.pretty=true;
	mongoose.set('debug',true);
}

require('./config/routes')(app);

app.locals.moment=require('moment');
app.listen(port);                         //监听端口

console.log('demo is started '+port);        //在服务台打印一行日志

