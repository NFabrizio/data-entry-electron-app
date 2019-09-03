const spawn = require('child_process').spawn;
const gulp  = require('gulp');
const template = require('gulp-template');
const maps  = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const css   = require('gulp-css');
const path   = require('path');
const uuidv4 = require('uuid/v4');

/* Build */
gulp.task('build-css', function(){
  return gulp.src('src/**/*.css')
    .pipe(css())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-data', function(){
  return gulp.src('data/*.json')
    .pipe(gulp.dest('dist/data'));
});

gulp.task('build-js', () => {
  return gulp.src(['main.js', 'store.js', 'src/**/*.js', '!src/**/*.test.js'])
    .pipe(maps.init())
    .pipe(babel())
    .pipe(maps.write('.'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('build', gulp.series('build-css', 'build-data', 'build-js'));


/* Copy */
gulp.task('copy-html', () => {
  // Create nonces during the build and pass them to the template for use with inline scripts and styles
  const nonceData = {
    scriptNonce: new Buffer(uuidv4()).toString('base64'),
    styleNonce: new Buffer(uuidv4()).toString('base64')
  };
  return gulp.src('src/*.html')
  .pipe(template(nonceData))
  .pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets', () => {
  return gulp.src('assets/**/*').pipe(gulp.dest('dist/assets'));
});

gulp.task('copy', gulp.parallel('copy-html', 'copy-assets'));



/* Execute */
const cmd   = (name) => path.join('.', 'node_modules', '.bin', name);
const args  = (more) => Array.isArray(more) ? ['.'].concat(more) : ['.'];
const exit  = () => process.exit();

gulp.task('start', gulp.series('copy', 'build', async () => {
  spawn(cmd('electron'), args(), { stdio: 'inherit', cwd: '.', shell: true }).on('close', exit);
}));


gulp.task('release', gulp.series('copy', 'build', () => {
  spawn(cmd('electron-builder'), args(), { stdio: 'inherit', cwd: '.', shell: true }).on('close', exit);
}));

gulp.task('test', gulp.series('copy', 'build', () => {
  spawn(cmd('jest'), args(), { stdio: 'inherit', cwd: '.', shell: true }).on('close', exit);
}));
