var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('start', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
