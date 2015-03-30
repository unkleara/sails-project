var gulp = require('gulp'),
    del = require('del'),
    gulpPlugin = require('gulp-load-plugins')({lazy: true}),
    util = gulpPlugin.util,
    config = require('./../gulp.config')();


gulp.task('clean', function(done) {
    var files = config.temp.root;

    log('Cleaning: ' + files);
    clean(files, done);
});


function clean(path, done) {
    del(path, done);
}

gulp.task('log', function() {
    log('testestset');
});

function log(output) {
    util.log(util.colors.yellow(output));
}