gulp = require 'gulp'
jade = require 'gulp-jade'
webserver = require 'gulp-webserver'
ghPages = require 'gulp-gh-pages'

port = 3000

src =
  jade: 'src/jade/*.jade'
  js: 'src/js/*.js'


dist =
  jade: 'dist/'
  js: 'dist/js'

gulp.task 'jade', =>
  gulp.src src.jade
    .pipe jade
      pretty: true
    .pipe gulp.dest dist.jade

gulp.task 'js', =>
  gulp.src src.js
    .pipe gulp.dest dist.js


gulp.task 'webserver', =>
  gulp.src 'dist'
    .pipe webserver
        host: 'localhost'
        port: port
        livereload: true

gulp.task 'watch', =>
  gulp.watch(src.jade, ['jade'])
  gulp.watch(src.js, ['js'])

gulp.task 'deploy', =>
  gulp.src 'dist/**/*'
    .pipe ghPages()

gulp.task 'default' ,['js', 'jade', 'webserver', 'watch']
