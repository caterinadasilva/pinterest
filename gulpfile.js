var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	webserver = require('gulp-webserver');

gulp.task('script', function() {
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'assets/js/*.js'])
		.pipe(concat('script.js'))
		// carpeta dist
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function(){
	gulp.src(['assets/scss/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('webserver', function(){
	gulp.src('../pinterest/')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			directoryListing: false,
			open: true
		}));
});

gulp.task('watch', function() {
    gulp.watch('assets/scss/*.scss', ['style']);
});

gulp.task('default', ['script', 'style', 'webserver', 'watch'])