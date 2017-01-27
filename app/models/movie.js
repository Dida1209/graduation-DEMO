var moogoose = require('mongoose');
var MovieSchema = require('../schemas/movie');  //取出movie这个模式
var Movie = moogoose.model('Movie',MovieSchema);   //利用mongoose.model编译生成Movie的模型，两个参数，一个是这个模型的名字Movie，一个是这个模式的名字MovieSchema

module.exports=Movie;//导出这个Movie