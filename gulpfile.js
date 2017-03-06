var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

gulp.task('serve', ['sass'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css'));
});

gulp.task('css', function() {
	return gulp.src('src/css/**/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/css'));
})

gulp.task('img', function() {
	return gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
		.pipe(changed('public/img'))
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'));
})

gulp.task('default', ['serve']);