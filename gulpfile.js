var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    merge = require('merge-stream');

gulp.task('lint', function() {
    var publicApp = gulp.src('public/app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    var serverApp = gulp.src('server/app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    return merge(publicApp, serverApp);
});

gulp.task('scripts', function() {
    return gulp.src('public/app/*.js')
        .pipe(rename('*.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('public/app/*.js', ['lint', 'scripts']);
    gulp.watch('server/*js', ['lint']);
});

gulp.task('default', ['lint', 'scripts', 'watch']);
