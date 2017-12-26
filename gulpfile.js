var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src(['app/scss/style.scss', 'app/scss/*.scss'])
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Move the sweet alert 2 files into our /js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/sweetalert2/dist/sweetalert2.all.js', 'app/js/app.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Move the animate css files into our /css folder
gulp.task('animate', function() {
    return gulp.src(['node_modules/animate.css/animate.min.css'])
        .pipe(gulp.dest("app/css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('concat', function() {
    return gulp.src(['app/css/app.css', 'app/css/style.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch(['app/scss/style.scss']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'animate', 'concat', 'serve'], function() {
    return gulp.src("app/index.html")
        .pipe(gulp.dest('dist/'));
});