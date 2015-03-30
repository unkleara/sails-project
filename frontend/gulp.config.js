'use strict';

module.exports = function() {
    var srcRoot = './src';

    var config = {
        rootDir: './',
        views: {
            index: srcRoot + '/index.html',
            all: srcRoot + '/app/**/*.html'
        },
        less : [srcRoot + '/less/*.less'],
        fonts: [srcRoot + '/fonts/*'],
        js : [
            srcRoot + '/**/*.js'
        ],
        jsOrder: [
            srcRoot + '/app/*.js',
            srcRoot + '/app/**/*.module.js',
            srcRoot + '/app/**/*.js'
        ],
        temp: {
            root: './.tmp',
            index: './.tmp/index.html',
            styles: './.tmp/css/',
            js : ['./.tmp/**/*.js'],
            css : ['./.tmp/css/**/*.css'],
            fonts : ['./.tmp/fonts/']
        }
    };

    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        //exclude: ['bower_components/bootstrap/dist/js/bootstrap.js'],
        //exclude: ['bower_components/sails.io.js'],
        ignorePath: '../..'
    };

    config.getWiredepOptions = function() {
        var options = {
            bowerJson: bower.json,
            directory: bower.directory,
            ignorePath: bower.ignorePath,
            exclude: bower.exclude
        };
        return options;
    };

    return config;
};
