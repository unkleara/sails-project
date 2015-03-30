var gulp = require('gulp'),
    url = require('url');

// IMPORTANT: gulp tasks are separated under build-tasks directory for maintainability
var requireDir = require('require-dir'),
    dir = requireDir('./build-tasks');

// gulpPlugin variable for shorter name using gulp plugins,
var gulpPlugin = require('gulp-load-plugins')({lazy: false}),
    browserSync = require('browser-sync'),
    config = require('./gulp.config')();

var proxy = require('express-http-proxy');
var express = require('express'),
    server = express(),
   serverPort = 9000;

gulp.task('copy-index', function() {
    return gulp.src([config.views.index])
        .pipe(gulp.dest(config.temp.root));
});

gulp.task('serve', ['build'], function() {
        //static fileserver
        server.listen(serverPort);
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(config.less, ['less']);
    gulp.watch(config.js, ['scripts']);
    gulp.watch(config.views.all, ['templates', 'bs-reload']);
    gulp.watch(config.views.index, ['wiredep']).on('change', browserSync.reload);
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('browser-sync', function() {
    var proxyOptions = url.parse('http://localhost:1337/api');
    proxyOptions.route = '/api';
    browserSync({
        proxy: "http://localhost:9000",
        port: 8080,
        files: [config.js, config.temp.css],
        middleware: [proxy(proxyOptions)]
    });
});


gulp.task('build', ['wiredep']);
gulp.task('default', ['serve', 'watch']);


server.use(express.static(config.rootDir));

server.use('/api', proxy('http://localhost:1337', {
    forwardPath: function(req, res) {
        return url.parse(req.url).path;
    }
}));

server.all('/*', function(req, res, next) {

    // send only the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: config.temp.root });
});
