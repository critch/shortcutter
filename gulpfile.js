var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

gulp.task('uglify', function () {
        return pipeline(
                gulp.src('lib/*.js'),
                uglify(),
                gulp.dest('dist')
        );
})



function defaultTask(cb) {
  // place code for your default task here
  cb();
}


exports.default = defaultTask
