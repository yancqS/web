'use strict';

import gulp from 'gulp';
import _$ from 'gulp-load-plugins';
import open from 'open';
const $ = _$();

// import concat from 'gulp-concat';
// import uglify from 'gulp-uglify';
// import rename from 'gulp-rename';
// import babel from 'gulp-babel';
// import cleanCss from 'gulp-clean-css';
// import less from 'gulp-less';
// import htmlmin from 'gulp-htmlmin';
// import livereload from 'gulp-livereload';
// import connect from 'gulp-connect';

//组册 合并压缩js任务
gulp.task("js", () =>
    gulp.src("src/js/*.js")
        .pipe($.concat("build.js"))
        .pipe(gulp.dest("dist/js/"))
        .pipe($.babel())
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"))
        .pipe($.livereload())
        .pipe($.connect.reload())
);

//组册 转换less任务
gulp.task('less', () =>
    gulp.src("src/less/*.less")
        .pipe($.less())
        .pipe(gulp.dest("src/css/"))
        .pipe($.livereload())
        .pipe($.connect.reload())
);

//注册 压缩css任务
gulp.task('cssmin', ['less'], () =>
    gulp.src("src/css/*.css")
        .pipe($.concat("build.css"))
        .pipe(gulp.dest("dist/css/"))
        .pipe($.cleanCss({
            compatibility: 'ie8'
        }))
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/css/"))
        .pipe($.livereload())
        .pipe($.connect.reload())
);
//注册 压缩html任务
gulp.task('html', () =>
    gulp.src("./index.html")
        .pipe($.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/"))
        .pipe($.livereload())
        .pipe($.connect.reload())
    );

//注册监视任务(半自动)
gulp.task('watch', ['default'], () => {
    $.livereload.listen();//开启监听
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssmin']);
    });

//注册监视任务(全自动)
gulp.task('server', ['default'], () => {
    //配置服务器的选项
    $.connect.server({
        root: 'dist/',
        livereload: true,
        port: 5000
    });

    open("http://localhost:5000");

    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssmin']);
});


gulp.task("default", ['js', 'less', 'cssmin', 'html']);
