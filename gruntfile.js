module.exports=function(grunt){
	//大多数grunt的数据都是定义成对象后传给grunt.initConfig（）
	//这里直接在initConfig里写这个对象了
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				option:{
					livereload:true  //当文件发生改变时，重新启动
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schema/**/*.js'],
				//tasks:['jshint'],  //语法检查
				options:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{  //开发环境
				options:{
					file:'app.js',  //当前的入口环境
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['app','config'],
					debug:true,
					delayTime:1000,  //当大批量的文件改动的时候，不需要每个文件改动的时候都来重启一次，而是等待一秒后再来重启一次
					env:{
						PORT:3000
					},
					cwd:__dirname  //目录是当前的服务
				}
			}
		},

		concurrent:{           //我们在grunt.registerTask里面注册了一个默认的任务，就是concurrent这个任务
			tasks:['nodemon','watch'],       //而concurrent要执行的任务表里有nodemon和watch这两个任务
			options:{
				logConcurrentOutput:true
			}
		}
	})

	//载入任务
	grunt.loadNpmTasks('grunt-contrib-watch');  //加载任务插件，只要有文件添加修改删除，就会重新执行你在它里面注册好的任务
	grunt.loadNpmTasks('grunt-nodemon');//实时监听app.js,这个入口文件进行了改动，它会自动的重启，可以看作是app.js的一个包装
	grunt.loadNpmTasks('grunt-concurrent');//针对慢任务开发的一个插件，比如说sass，less，coffee他们的编译就属于慢任务，优化构建的时间，同时可以跑多个注册的任务比如说watch和nodemon
	//注册任务
	grunt.option('force',true);//为了避免由于语法错误而中断了整个grunt的服务
	grunt.registerTask('default',['concurrent']);//默认的任务，传入一个数组，执行concurrent这个任务
}