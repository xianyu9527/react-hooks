const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

// 实现clean,删除产出物
gulp.task('clean', async function () {
  await del('dist');
  await del('es');
  await del('lib');
});
// 1.产出esm
gulp.task('esm', function () {
  // 产出tsproject
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'ESNext',
  });
  // 将ts 产物转换为js 并将js通过babel转换为es5兼容的代码
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});
// 2.产出cjs
gulp.task('cjs', function () {
  // 通过上一步的esm产物打包为commonjs
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});
// 3.实现.d.ts类型声明
gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclaration: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});
// 4.复制外部的read
gulp.task('copyReadme', async function () {
  await gulp.src('../../ReadMe.md').pipe(gulp.dest('../../packages/hooks'));
});
// 5.将产物放到cdn上


exports.default = gulp.series('clean', 'esm', 'cjs', 'declaration', 'copyReadme');
