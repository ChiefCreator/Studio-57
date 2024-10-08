const gulp = require("gulp");

const fileInclude = require("gulp-file-include");

const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const sourceMaps = require("gulp-sourcemaps");
const groupMedia = require("gulp-group-css-media-queries");

const server = require("gulp-server-livereload");

const clean = require("gulp-clean");
const fs = require("fs");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const webpack = require("webpack-stream");

gulp.task("html:dev", function() {
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "HTML",
                message: "Error <%= error.message %>",
                sound: false,
            })
        }))
        .pipe(fileInclude({
            prefix: "@@",
            basepath: "@file",
        }))
        .pipe(gulp.dest("./docs/"))
});

gulp.task("scss:dev", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Styles",
                message: "Error <%= error.message %>",
                sound: false,
            })
        }))
        .pipe(sourceMaps.init())
        // .pipe(sassGlob())
        .pipe(sass())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("./docs/css/"))
});

gulp.task("images:dev", function() {
    return gulp.src("./src/img/*")
        .pipe(gulp.dest("./docs/img/"))
});

gulp.task("video:dev", function() {
    return gulp.src("./src/video/*")
        .pipe(gulp.dest("./docs/video/"))
});

gulp.task("icons:dev", function() {
    return gulp.src("./src/icon/*")
        .pipe(gulp.dest("./docs/icon/"))
});

gulp.task("js:dev", function() {
    return gulp.src("./js/*.js")
        .pipe(webpack(require("./../webpack.config.js")))
        .pipe(gulp.dest("./docs/js"))
});

gulp.task("server:dev", function() {
    return gulp.src("./docs/")
        .pipe(server({
            livereload:true,
            open:true,
        }))
});

gulp.task("clean:dev", function(done) {
    if (fs.existsSync("./docs/")) {
        return gulp.src("./docs/", {read:false})
            .pipe(clean())
    }
    done()
})

gulp.task("watch:dev", function() {
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("scss:dev"));
    gulp.watch("./src/**/*.html", gulp.parallel("html:dev"));
    gulp.watch("./src/img/*", gulp.parallel("images:dev"));
    gulp.watch("./src/icon/*", gulp.parallel("icons:dev"));
    gulp.watch("./src/video/*", gulp.parallel("video:dev"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev"));
})