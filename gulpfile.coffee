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

gulp.task 'css', =>
  gulp.src "src/css/*.css"
    .pipe gulp.dest "dist/css"

gulp.task 'img', =>
  gulp.src "src/img/*"
    .pipe gulp.dest "dist/img"

gulp.task 'audio', =>
  gulp.src "src/audio/*"
    .pipe gulp.dest "dist/audio"

gulp.task 'webserver', =>
  gulp.src 'dist'
    .pipe webserver
        host: 'localhost'
        port: port
        livereload: true

gulp.task 'watch', =>
  gulp.watch(src.jade, ['jade'])
  gulp.watch(src.js, ['js'])
  gulp.watch("src/css/*.css", ['css'])
  gulp.watch("src/img/*", ['img'])
  gulp.watch("src/audio/*", ['audio'])

gulp.task 'deploy', =>
  gulp.src 'dist/**/*'
    .pipe ghPages()

gulp.task 'default' ,['js', 'jade', "css", "img", "audio", 'webserver', 'watch']
