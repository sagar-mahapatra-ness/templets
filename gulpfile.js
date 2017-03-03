var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
const filter = require('gulp-filter');
var clean = require('gulp-clean');

var path = {
	source:"./app",
	target:"./dist"
};

var jsFilter = filter('app/bower_components/**/*.js');
var cssFilter = filter('app/bower_components/**/*.css');

gulp.task('clean',function() {
return gulp.src(path.target+"/*.*", {read: false})
 .pipe(clean({force: true})); 
});
       
gulp.task('copyLibraryAssets',function() {
   return gulp.src(mainBowerFiles())
       .pipe(jsFilter)
       .pipe(gulp.dest(path.target + '/libs/'))
	   .pipe(cssFilter)
       .pipe(gulp.dest(path.target + '/css'))
});

gulp.task('injectLibraryAssets',['copyLibraryAssets'],function() {
   return gulp.src(path.target+'/index.html') 
       .pipe(inject(gulp.src([path.target + '/libs/**/*.js'], {read: false})),{
		    starttag: '<!-- inject:libJs -->',
            endtag: '<!-- endaibJsinject -->',
                relative:true
	   })
       .pipe(gulp.dest(path.target+'/index.html'));
});

 

gulp.task('copyHTML',function() {
   return gulp.src([path.source+"/**/*.html",'!'+path.source+'/index.html']) // path to your files
    .pipe(gulp.dest(path.target));;
});

gulp.task('default', ['clean','copyHTML','injectLibraryAssets']);