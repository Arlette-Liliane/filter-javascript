// Requis
var 
gulp = require('gulp');
newer = require('gulp-newer'),
imagemin = require('gulp-imagemin'),
htmlclean = require('gulp-htmlclean'),
concat = require('gulp-concat'),
deporder = require('gulp-deporder'),
stripdebug = require('gulp-strip-debug'),
uglify = require('gulp-uglify'),
sourcemaps = require('gulp-sourcemaps');

// Include plugins
 plugins = require('gulp-load-plugins')(), // tous les plugins de package.json

// Variables de chemins
source = './src', // dossier de travail
destination = './dist' // dossier à livrer

gulp.task('css', function () {
    return gulp.src(source + '/assets/css/styles.scss')
      .pipe(plugins.sass())
      //ordonner css
      .pipe(plugins.csscomb())
      //ré_indenter et reformater
      .pipe(plugins.cssbeautify({indent: '  '}))
      //autoprefixer
      .pipe(plugins.autoprefixer())
      .pipe(gulp.dest(destination + '/assets/css/'));
  });

gulp.task('minify', function(){
    return gulp.src(destination + '/assets/css/*.css')
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/assets/css/'));
});

// JavaScript processing
gulp.task('js', function() {

    var jsbuild = gulp.src(source + 'assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write());
  
    return jsbuild.pipe(gulp.dest(destination + 'assets/js/'));
  
});

// Tâche "build"
gulp.task('build', ['css', 'js']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
    gulp.watch(source + '/assets/css/*.scss', ['build']);
    gulp.watch(source + 'js/**/*', ['js']);
  });
  
// Tâche par défaut
gulp.task('default', ['build']);