var gulp = require("gulp");

var uglify = require("gulp-uglify"); //压缩模块

var babel = require("gulp-babel"); //es6的转译

var rename = require("gulp-rename"); //重新命名模块

var sass = require("gulp-ruby-sass"); //sass

var connect = require("gulp-connect"); // 热部署

var webserver = require("gulp-webserver")

var proxy = require('http-proxy-middleware')

gulp.task("JS", function() {
	gulp.src("./plug/*.js").pipe(babel({
		presets: ["es2015"]
	})).pipe(uglify()).pipe(rename({
		suffix: ".min"
	})).pipe(gulp.dest("./minjs"));
})

gulp.task("compilesass", function() {
	sass("./scss/*.scss", {
		style: "expanded"
	}).pipe(gulp.dest("./css/"));
})

gulp.task("refreshHTML", function() {
	gulp.src('./html/*.html').pipe(connect.reload());
})

gulp.task("webserver", function() {
	gulp.src('./')
		.pipe(
			webserver({
				host: 'localhost',
				port: 8000,
				livereload: true,
				directoryListing: {
					enable: true,
					path: './'
				},
				middleware: [
					proxy('/Product',{
						target: 'http://www.zhongjiu.cn', // target host
						changeOrigin: true, // needed for virtual hosted sites
						/*pathRewrite: {
						  'api' : '' // remove base path
						}*/
					}),
					proxy('/shopdata',{
						target: 'http://datainfo.duapp.com', // target host
						changeOrigin: true, // needed for virtual hosted sites
						/*pathRewrite: {
						  'api' : '' // remove base path
						}*/
					}),
					proxy('/shop',{
						target: 'http://www.mango918.com', // target host
						changeOrigin: true, // needed for virtual hosted sites
						/*pathRewrite: {
						  'api' : '' // remove base path
						}*/
					})
				]
			})
		)
})

gulp.task("listen", function() {

	// connect.server({
	// 	livereload:true
	// });

	//gulp.watch("./scss/*.scss", ["compilesass"]);
	gulp.watch("./html/*.html", ["refreshHTML"]);
	gulp.watch("./html/sub/*.html", ["refreshHTML"]);
	gulp.watch("./css/*.css", ["refreshHTML"]);
	gulp.watch("./js/section/*.js", ["refreshHTML"]);
	gulp.watch("./js/module/*.js", ["refreshHTML"]);
})

gulp.task('default', ["listen", "webserver"], function() {
	console.log('done.');
})