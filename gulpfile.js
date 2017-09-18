var gulp = require("gulp");
//加载压缩js模块
var uglify = require("gulp-uglify");
var babel = require("gulp-babel"); //编译ES6
var connect = require("gulp-connect"); //热部署（即时刷新）
//定义一个任务，处理html
gulp.task("refreshHTML", function() {
	//src用来读取，pipe用来输送
	gulp.src("./*.html").pipe(connect.reload());
});
//监听任务
gulp.task("minjs", function() {
	//任务要执行的代码
	gulp.src("./js/module/*.js") //从指定目录读取js文件
		.pipe(babel())
		.pipe(uglify()) //通过pipe输送到 压缩模块
		.pipe(gulp.dest("./minjs/")); //通过pipe输送到 目标位置
	gulp.src("./js/model/*.js") //从指定目录读取js文件
		.pipe(babel())
		.pipe(uglify()) //通过pipe输送到 压缩模块
		.pipe(gulp.dest("./minjs/")); //通过pipe输送到 目标位置
});
gulp.task("watch", function() {
	//让connect启动一个服务器，这样它才能即时刷新浏览器
	connect.server({
		livereload: true
	});
	//检测文件的变化，执行相应的任务
	gulp.watch("./html/*.html", ["refreshHTML"]);
	gulp.watch("./html/sub/*.html", ["refreshHTML"]);
	gulp.watch("./css/*.css", ["refreshHTML"]);
	gulp.watch("./js/section/*.js", ["refreshHTML"]);
	gulp.watch("./js/module/*.js", ["refreshHTML"]);

});