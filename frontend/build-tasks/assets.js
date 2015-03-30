var gulp = require('gulp'),
    path = require('path'),
    gulpPlugin = require('gulp-load-plugins')({lazy: true}),
    config = require('./../gulp.config')();


/** Runs all application js tasks
*/ gulp.task('scripts', ['jshint', 'appJs', 'templates']);


/** Runs all CSS/LESS style tasks
*/ gulp.task('styles', ['less', 'fonts']);

gulp.task('fonts', function() {
    gulp.src(config.fonts)
    .pipe(gulp.dest('./.tmp/fonts/'));

});

gulp.task('jshint', function () {
    return gulp.src('!/src/app/**/*.module.js', config.js)
        .pipe(gulpPlugin.jshint())
        .pipe(gulpPlugin.jshint('./.jshintrc'))
        .pipe(gulpPlugin.jshint.reporter('default'));
    //.pipe(plugins.jshint.reporter('fail'))
});

/** Inject js/css into index.html **/
gulp.task('wiredep', ['copy-index', 'scripts', 'styles'], function() {
    var options = config.getWiredepOptions();
    var wiredep = require('wiredep').stream;

    return gulp.src(config.temp.index)
        .pipe(wiredep(options))
        .pipe(gulpPlugin.inject(gulp.src(config.temp.js), {relative: false}))
        .pipe(gulpPlugin.inject(gulp.src(config.temp.css), {relative: false}))
        .pipe(gulp.dest(config.temp.root));
});

/** Angular app js files **/
gulp.task('appJs', function () {
    return gulp.src(config.jsOrder)
        //.pipe(gulpPlugin.uglify({
          //  mangle: false,
            //compress: false
        //}))
        .pipe(gulpPlugin.concatUtil('application.js'))
        .pipe(gulp.dest(config.temp.root));
});

/** Angular templates which are called in views and directives **/
gulp.task('templates', function () {
    return gulp.src(config.views.all)
        .pipe(gulpPlugin.angularTemplatecache('templates.js', {
            standalone: true,
            base: function (file) {
                return '/' + path.basename(file.relative);
            }
        }))
        .pipe(gulp.dest(config.temp.root));
});

gulp.task('less', function () {
    return gulp.src(config.less)
        .pipe(gulpPlugin.less())
        .pipe(gulp.dest(config.temp.styles));
});
