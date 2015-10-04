var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");
var notify = require("gulp-notify");
var sass = require("gulp-sass");
var cssShrink = require("gulp-cssshrink");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var browsersync = require("browser-sync").create();

var errorHandler = function (e) {
    "use strict";

    console.log(e);
    notify("ops!");
    this.emit("end");
};

gulp.task("browsersync", function () {
    "use strict";

    browsersync.init({
        server: "./web",
        open: false
    });

    gulp.watch([
        "web/*.html",
        "web/js/*.js"
    ]).on("change", browsersync.reload);
});

gulp.task("browserify", function () {
    "use strict";

    return browserify({
        standalone: "App",
        paths: ["./src/js"],
        debug: false
    })
    .transform(reactify)
    .on("error", errorHandler)
    .add("./src/js/bootstrap.js")
    .bundle()
    .on("error", errorHandler)
    .pipe(source("bundle.js"))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest("./web/js"))
    .pipe(notify("bundle updated"));
});

gulp.task("css", function () {
    "use strict";

    return gulp.src([
        "./src/css/main.scss"
    ])
    .pipe(sass())
    .on("error", errorHandler)
    // .pipe(cssShrink())
    .pipe(rename("bundle.css"))
    .pipe(gulp.dest("./web/css"))
    .pipe(browsersync.stream());
});

gulp.task("default", ["browserify", "css", "browsersync"], function () {
    "use strict";

    gulp.watch("src/js/**/*.js", ["browserify"]);
    gulp.watch("src/css/**/*.scss", ["css"]);
});
