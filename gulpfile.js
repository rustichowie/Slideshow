var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function(){
  return gulp.src('./source/sass/screen.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
})

gulp.task('default', function(){
  gulp.watch('./source/sass/**/*.scss', ['sass']);
})
