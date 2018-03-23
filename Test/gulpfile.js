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
sourcemaps = require('gulp-sourcemaps'),
pump = require('pump'),
minify = require('gulp-minify'),

// Include plugins
 plugins = require('gulp-load-plugins')(), // tous les plugins de package.json
 devBuild = (process.env.NODE_ENV !== 'production'),
// Variables de chemins
source = './src', // dossier de travail
destination = './dist' // dossier à livrer

gulp.task('css', function () {
    return gulp.src(source + '/assets/css/**/*.css')
      .pipe(gulp.dest(destination + '/assets/css/'));
  });

  gulp.task('sass', function () {
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

gulp.task('images', function(cb) {
    var out = destination + '/assets/img/';
    pump([
        gulp.src(source + '/assets/img/**/*'),
      newer(out),
      gulp.dest(out)
      ],
      cb
    );

});

// JavaScript processing
gulp.task('js', function(cb) {

    pump([
        gulp.src(source + '/assets/js/**/*'),
        deporder(),
        minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }),
        stripdebug(),
        gulp.dest(destination + '/assets/js/')
      ],
      cb
    );

   /*return gulp.src(source + '/assets/js/')
    .pipe(deporder())
    .pipe(concat('main.js'))
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(destination + '/assets/js/'));*/
  
});

// Tâche "build"
gulp.task('build', ['sass', 'css', 'js', 'images']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build', 'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
    gulp.watch(source + '/assets/css/*.scss', ['build']);
    gulp.watch(source + '/assets/js/**/*', ['js']);
  });
  
// Tâche par défaut
gulp.task('default', ['build']);