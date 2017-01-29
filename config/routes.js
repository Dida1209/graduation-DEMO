var index=require('../app/controller/index');
var user=require('../app/controller/user');
var movie=require('../app/controller/movie');

module.exports=function(app){

//pre handle user
app.use(function(req,res,next){
	var _user=req.session.user;
		app.locals.user=_user;
	next();
})

//index	page  在express里编写路由是简单的
app.get('/',index.index);

//signup
app.post('/user/signup',user.signup);

//signin
app.post('/user/signin',user.signin);

//logout
app.get('/logout',user.logout);

//userlist
app.get('/admin/user/list',user.showUserSignin,user.showUserRole,user.list);

//movie.detail
app.get('/movie/:id',movie.detail);

//movie.new后台录入页
app.get('/admin/movie',user.showUserSignin,user.showUserRole,movie.new);

//list列表页按更新时跳转到后台页，并且把后台页的数据初始化
app.get('/admin/update/:id',user.showUserSignin,user.showUserRole,movie.update);

//admin post movie 拿到从后台录入页post过来的数据
app.post('/admin/movie/new',user.showUserSignin,user.showUserRole,movie.save);

//movie.list
app.get('/admin/list',user.showUserSignin,user.showUserRole,movie.list);

//app.use(express.static(path.join(__dirname, '/public')));
//视频网址：http://player.hunantv.com/mgtv_v5_main/main.swf?b/298050/cxid=95kqkw8n6&js_function_name=vjjFlash&video_id=3726416&statistics_bigdata_bid=1&cpn=1
//图片地址：https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484916496040&di=dacb2dece0941423cbd9bb54f3a7053a&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201601%2F03%2F20160103085338_eyBCL.jpeg

//list delete movie
app.delete('/admin/list',user.showUserSignin,user.showUserRole,movie.del);

}
