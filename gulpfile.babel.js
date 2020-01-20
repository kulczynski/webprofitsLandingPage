import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

gulp.task('sass', () => {
    gulp.src('./src/styles/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            "overrideBrowserslist": [
                "last 1 version",
                "> 1%",
                "maintained node versions",
                "not dead"
            ]
        }))
        .pipe(clean())
        .pipe(gulp.dest('./dist/css'));
    //sass > css (gulp-sass)
    //minification (gulp-clean-css)
    //autoprefix (gulp-autoprefixer)
});

gulp.task('js', () => {
    gulp.src([
        './src/js/other.js',
        './src/js/app.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
    // concatenate gulp-concat
    // babel.js gulp-babel
    // minification gulp-uglify
});

gulp.task('static', () => {
    gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
    gulp.src('./src/img/**/*.*').pipe(gulp.dest('./dist/img/'));
});

gulp.task('clean', () => {
    return del('./dist')
});

gulp.task('watch', ['default'], () => {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/**/*.html', ['static']);
});

gulp.task('build', ['clean'], () => {
    gulp.start(['static', 'sass', 'js'])
});

gulp.task('default', ['build']);