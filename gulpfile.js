var gulp         = require('gulp'), //gulp
	sass         = require('gulp-sass'), //sass
	browserSync  = require('browser-sync'), //live-reload
	concat       = require('gulp-concat'), //конкатенация
	uglify       = require('gulp-uglifyjs'), //сжатие js
	cssnano      = require('gulp-cssnano'), //сжатие css
	rename       = require('gulp-rename'), //переименовать
	csscomb      = require('gulp-csscomb'), //красивый код
	del 		 = require('del'), //очистить
	imagemin     = require('gulp-imagemin'), //сжатие img
	pngquant     = require('imagemin-pngquant'), //сжатие img png
	cache        = require('gulp-cache'), //кеш
	prefix       = require('gulp-autoprefixer'); //префиксы для кроссбраузерности
	jade         = require('gulp-jade');

/* ПРИМЕР СОЗДАНИЯ ТАСКА
gulp.task('mytask', function () {
	return gulp.src('source-files')
	.pipe(plugin())
	.pipe(gulp.dest('folder'));
});
*/

gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(csscomb())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/slick/slick.js',
		'app/libs/bootstrap-validator/js/validator.js',
		'app/js/main.js',
		'app/libs/font-awesome/js/fontawesome-all.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
})

gulp.task('css-libs', ['sass'], function() {
	return gulp.src(['app/css/main.css', 'app/css/preload.css'])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});
/*
gulp.task('clean', function() {
	return cache.clearAll();
});
*/
gulp.task('img', function() {
	return gulp.src(['app/img/**/*.png', 'app/img/**/*.jpg'])
	.pipe(cache(imagemin({
		interlaced: true,
		progressiv: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('jade', function() {
	return gulp.src('app/templates/**/*.jade')
	    .pipe(jade({
	    	pretty: true
	    })) 
	    .pipe(gulp.dest('app/'));
	    browserSync.reload();
});

gulp.task('watch', ['scripts', 'browser-sync', 'css-libs'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/templates/**/*.jade', ['jade']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/img/**/*', browserSync.reload);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
});


gulp.task('build', ['clean', 'img', 'css-libs', 'scripts', 'jade'], function() {
	
	var buildCss = gulp.src(['app/css/main.min.css', "app/css/preload.css"])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

    var buildImg = gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));

	var buildJS = gulp.src('app/js/libs.min.js')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildPHP = gulp.src('app/*.php')
	.pipe(gulp.dest('dist'));

});