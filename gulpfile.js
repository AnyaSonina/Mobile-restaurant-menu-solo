const { src, dest, watch, series} = require('gulp')
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

exports.build = series(buildStyles, watchTask)


