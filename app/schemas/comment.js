var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var CommentSchema = new mongoose.Schema({
	movie:{type:ObjectId,ref:'Movie'},  //指向数据库Movie这个模型
	from:{type:ObjectId,ref:'User'},
	to:{type:ObjectId,ref:'User'},
	content:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.Now()
		}
	}
})

CommentSchema.pre('save',function(next){             //这个方法是在存储前会被操作的方法
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}
	next();
})

CommentSchema.statics={
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports=CommentSchema;