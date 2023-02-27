const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))



function buildStyles() {
  return src('sassfiles/**/*.scss')
  .pipe(sass())
  .pipe(purgecss({content: ['*.html']}))
  .pipe(dest('css'))
}

function watchTask() {
  watch(['sassfiles/**/*.scss', '*.html'], buildStyles)

}

exports.default = series(buildStyles, watchTask)


gulp.task('deploy', ['build'], function(e){
  return gulp.src("index.js.build")
    .pipe(deploy())
})
