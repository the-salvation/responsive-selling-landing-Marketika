const { src, dest, gulp } = require ('gulp');
const  { sass, logError } = require ('gulp-sass');
const browserSync = require('browser-sync').create();
import gulpStylelint from 'gulp-stylelint';

function style (){
	return src('./scss/**/*.scss')
		.pipe(gulpStylelint({
			reporters: [
				{
					formatter: 'string', 
					console: true
				}
			]
		}))
		.pipe(sass().on('error', logError))
		.pipe(dest('./scss'))
		.pipe(browserSync.stream());
}

// function lintCss () {
// 	return src('./css/**/*.scss')
// 		.pipe(gulpStylelint({
// 			reporters: [
// 				{
// 					formatter: 'string', 
// 					console: true
// 				}
// 			]
// 		}));
// }


function watch(){
	browserSync.init({
		server:{
			baseDir:'./'
		}
	});
	gulp.watch('./css/**/*.scss', style);
	gulp.watch('./*.html').on('change', browserSync.reload);
	// gulp.watch('./scripts/*.js').on('change', browserSync.reload); 
        
}

const _style = style;
export { _style as style };
const _watch = watch;
export { _watch as watch };
// exports.lintCss = lintCss;


