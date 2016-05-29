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
var concat = require('gulp-concat');
var browsersync = require("browser-sync").create();
var aliasify = require("aliasify");
var aliasifyConfig = {
    aliases: {
        ".env.js": "./.env.js"
    },
    verbose: true
};
var environment = "dev";
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
        host: "0.0.0.0",
        open: false
    });

    gulp.watch([
        "web/*.html",
        "web/js/*.js"
    ]).on("change", browsersync.reload);
});

gulp.task("browserify", function () {
    "use strict";

    var bundle = browserify({
        standalone: "App",
        paths: ["./src/js"],
        debug: false,
        insertGlobalVars: true
    })
        .transform(reactify)
        .transform(aliasify, aliasifyConfig)
        .on("error", errorHandler)
        .add("./src/js/bootstrap.js")
        .bundle()
        .on("error", errorHandler)
        .pipe(source("bundle.js"))
        .pipe(buffer());

    if (environment === "prod") {
        bundle.pipe(uglify());
    }
    bundle.pipe(gulp.dest("./web/js"))
        .pipe(notify("bundle updated"));

    return bundle;
});

gulp.task("sass", function () {
    "use strict";

    return gulp.src([
        "./src/css/main.scss"
    ])
    .pipe(sass())
    .on("error", errorHandler)
    .pipe(rename("bundle.css"))
    .pipe(gulp.dest("./web/css"));
});

gulp.task("css", ["sass"], function () {
    "use strict";

    var bundle = gulp.src([
        "web/libs/uikit/css/uikit.min.css",
        "web/css/bundle.css"
    ])
    .pipe(concat('bundle.min.css'))

    if (environment === "prod") {
        bundle.pipe(cssShrink())
    }

    return bundle.pipe(gulp.dest("./web/css"))
        .pipe(browsersync.stream());
});

gulp.task("dev", ["browserify", "css", "browsersync"], function () {
    "use strict";

    gulp.watch(["src/js/**/*.js", "src/js/**/*.jsx"], ["browserify"]);
    gulp.watch("src/css/**/*.scss", ["css"]);
});

gulp.task("default", ["browserify", "css"]);

gulp.task("prod", function () {
    "use strict";

    aliasifyConfig.aliases[".env.js"] = "./.env.prod.js";
    environment = "prod";
    process.env.NODE_ENV = "production";

    gulp.start("browserify", "css");
});
