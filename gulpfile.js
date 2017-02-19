var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

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

gulp.task('default', ['serve']);