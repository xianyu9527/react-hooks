const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

// 实现clean,删除产出物
gulp.task('clean build', async function () {
  await del('dist');
  await del('es');
  await del('lib');
});

exports.default = gulp.series('clean')
