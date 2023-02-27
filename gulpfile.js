const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const build = require('gulp-build')

gulp.task('Samplebuild', function() {
  gulp.src('*.js')
  .pipe(build({ ID: '0011' }))
  .pipe(gulp.dest('dist'))
  })


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
