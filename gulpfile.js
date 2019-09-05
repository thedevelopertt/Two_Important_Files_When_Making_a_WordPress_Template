const gulp = require("gulp")
const sass = require("gulp-sass")
const clean_css = require("gulp-clean-css")
const rename = require("gulp-rename")
const uglify = require("gulp-terser")
const concat = require("gulp-concat")
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require("gulp-plumber")
const browsersync = require("browser-sync").create()
const puppeteer = require("puppeteer")
const phpunit = require("gulp-phpunit")


// This task compiles SASS to css with autoprefixer enabled, generates sourcemaps and minifies to the dist/css directory
gulp.task("sass",()=>{
    return gulp.src("src/sass/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write({includeContent:false}))
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(rename("style.css"))
        .pipe(clean_css())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browsersync.stream())
})

//This task concatenates all Javascript source file not including the libraries used to the dist/js directory
gulp.task('js_src', () => {
    return gulp.src("src/js/*.js")
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
        .pipe(browsersync.stream())
})

//This task is called with the gulp keyword
gulp.task('serve',()=>{

    gulp.watch("src/sass/*.scss",gulp.parallel("sass"))
    gulp.watch("src/js/*.js",gulp.parallel("js_src"))

    gulp.watch("./*.php").on('change', browsersync.reload);
    gulp.watch("./src/*.php").on('change', browsersync.reload);
})

//This task runs PHP tests
gulp.task('phpunit', async function() {
    const options = {debug: false};
    await gulp.src('./phpunit.xml')
        .pipe(phpunit('.\\vendor\\bin\\phpunit',options, (err,msg) => {
            console.log(`${err} - ${msg}`)
        }));
});

//Launches new Puppeteer Browser
gulp.task('puppeteer', async () => {
    // await puppeteer.launch({
    //     headless : false
    // })
})

//createBrowserSync
function _createBrowserSync(){
    browsersync.init({
        proxy : "https://thedevelopertt.ml"
    });
}
const createBrowserSync = _createBrowserSync;
exports.createBrowserSync = createBrowserSync;
//createBrowserSync

gulp.task("live-edit",()=>{
    createBrowserSync();
})

gulp.task("default",gulp.parallel("live-edit","sass","js_src","serve","puppeteer"))