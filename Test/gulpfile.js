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

// image processing
gulp.task('images', function() {
    var myDest = destination + '/assets/images/';
    return gulp.src(source + 'images/**/*')
      .pipe(newer(dest))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(myDest));
});

// HTML processing
gulp.task('html', ['images'], function() {
    var
      page = gulp.src('**/*')
        .pipe(newer(destination));
  
    // minify production code
    if (!devBuild) {
      page = page.pipe(htmlclean());
    }
  
    return page.pipe(gulp.dest(destination));
});

// JavaScript processing
gulp.task('js', function() {

    var jsbuild = gulp.src(source + 'assets/js/**/*')
      .pipe(deporder())
      .pipe(concat('main.js'));
  
    if (!devBuild) {
      jsbuild = jsbuild
        .pipe(stripdebug())
        .pipe(uglify());
    }
  
    return jsbuild.pipe(gulp.dest(destination + 'assets/js/'));
  
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
    gulp.watch(source + '/assets/css/*.scss', ['build']);
    gulp.watch(source + 'js/**/*', ['js']);
  });
  
// Tâche par défaut
gulp.task('default', ['build']);