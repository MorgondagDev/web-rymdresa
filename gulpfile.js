/**
 * Required modules
 */
// Gulp to run a gulp task!
var gulp = require('gulp')

// browserify is mainly used to remove the
// compiled es6 codes need to use require
var browserify = require('browserify')

// the meat of our pudding
var babel = require('babelify')

// gulp pipe logic
var through2 = require('through2')

// simply watch directory/files
var watch = require('gulp-watch')

// uglify js
var uglify = require('gulp-uglify')

//easy rename
var rename = require('gulp-rename');

// used to created a nice header
var header = require('gulp-header')

// load the package settings
var pkg = require('./package.json')

//clean folders
var clean = require('gulp-clean');

var replace = require('gulp-string-replace');

//stylus
var stylus = require('gulp-stylus');
var nib = require('nib')
var shell = require('gulp-shell')
var minifyCss = require('gulp-minify-css');

//img minification
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var imageminOptipng = require('imagemin-optipng');

var runSequence = require('run-sequence');

// create a banner that will be used on the minified file
var banner = [
	' /** <%= pkg.name %> - <%= pkg.description %>',
	' ** @author <%= pkg.author %>',
	' ** @version v<%= pkg.version %> **/',
	''
].join('\n')



/**
 * Build task
 * this passes the main script to browserify and reads it.
 * Then its passed to babelify that converts it to es5
 * Then bundles the require calls to a single file.
 * After that it minifies the code, slaps a banner on it and saves.
 */
gulp.task('build-js', function() {
	return gulp.src('./public/js/app.js')
		.pipe(through2.obj(function(file, enc, next) {
			browserify(file.path, {
					debug: true
				})
				.transform(babel)
				.bundle(function(err, res) {
					if (err) {
						throw new Error(err);
						this.emit('end')
					}
					file.contents = res
					next(null, file)
				})
		}))
		.on('error', function(err) {
			throw new Error(err);
			this.emit('end')
		})
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		/*.pipe(header(banner, {
			pkg: pkg
		}))*/
		.pipe(gulp.dest('./dist/public/js/'))
		.pipe(gulp.dest('./public/js/'))
})


gulp.task('stylus', shell.task([
	'stylus -u nib ./public/style/style.styl -c',
]))


gulp.task('build-css', ['stylus'], function() {
	return gulp.src('./public/style/style.css')
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./dist/public/style/'))
		.pipe(gulp.dest('./public/style/'))
})

// watch yoo files man.
gulp.task('watch', function() {
	gulp.watch(['./public/js/*.js', '!./public/js/app.min.js'], ['build-js'])
	gulp.watch(['./public/style/*.styl'], ['build-css'])
})


gulp.task('copy-assets', function() {
	gulp.src('./views/**/*').pipe(gulp.dest('./dist/views'));
	//gulp.src('./app.js').pipe(gulp.dest('./dist'));
	//gulp.src('./package.json').pipe(gulp.dest('./dist'));
	//gulp.src('./README.md').pipe(gulp.dest('./dist'));
	gulp.src('./public/favicon.ico').pipe(gulp.dest('./dist/public'));
	//gulp.src('./news.js').pipe(gulp.dest('./dist'));
	gulp.src('./public/fonts/**/*').pipe(gulp.dest('./dist/public/fonts'));
	gulp.src('./public/m/**/*').pipe(gulp.dest('./dist/public/m'));
	gulp.src('./public/assets/**/*').pipe(gulp.dest('./dist/public/assets'));
})

gulp.task('clean', function() {
	gulp.src('./dist/', {
		read: false
	}).pipe(clean()).pipe(gulp.dest(''));
})


gulp.task('post-copy-assets', function() {
	gulp.src('./dist/views/index.html').pipe(gulp.dest('./dist/public'));
})


gulp.task('post-clean', function() {
	gulp.src('./dist/views', {
		read: false
	}).pipe(clean()).pipe(gulp.dest(''));
})

gulp.task('build-img', function() {
	return gulp.src('./public/img/**/*')
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant(), imageminOptipng({
				optimizationLevel: 3
			})]
		}))
		.pipe(gulp.dest('./dist/public/img'));
});

gulp.task('deploy', function() {
	return runSequence(
		'clean', ['build-js', 'build-css', 'copy-assets', 'build-img']
	);
})

gulp.task('post-deploy', function() {
	return runSequence(
		'post-copy-assets', ['post-clean']
	);
})


gulp.task('replace', function() {
  gulp.src(["./dist/public/index.html"])
  .pipe(replace(/\.\.\/fonts/g, 'fonts'))
  .pipe(replace(/\.\.\/\.\.\/img/g, 'img'))
  .pipe(replace(/\.\.\/\img/g, 'img'))
  .pipe(replace(/\.\.\/\img\//g, 'img/'))
  .pipe(gulp.dest('./dist/public/'))
});
