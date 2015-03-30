var gulp = require('gulp');

gulp.task('admin-assets', function() {
  return gulp.src('./assets/**/*')
  .pipe(gulp.dest('./.tmp/public'));
});

gulp.task('watch', function() {
  gulp.watch('./assets/admin/js/*.js', ['admin-assets']);
});

gulp.task('default', ['admin-assets', 'watch']);
