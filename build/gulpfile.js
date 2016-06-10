var gulp = require('gulp'),
	concat = require("gulp-concat"),
	clean = require("gulp-clean"),
	uglify = require("gulp-uglify"),
	header = require('gulp-header'),
	rename = require('gulp-rename');

var closureStart =
  	'/**\n' +
	'* download file\n' +
	'* @date   2016-06-10\n' + 
	'* @author ganzw@guahao.com\n' +
	'* @site   https://github.com/baixuexiyang/download.git\n' +
	'*/\n';

// 清除download.min.js
gulp.task("cleand", function(){
  return gulp.src(['../download.min.js'], {read: false}).pipe(clean({force:true}));
});

// 压缩
gulp.task("default", ["cleand"], function() {
	return gulp.src("../src/download.js")
		.pipe(uglify({
			mangle: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(header(closureStart))
		.pipe(gulp.dest("../"));
});
