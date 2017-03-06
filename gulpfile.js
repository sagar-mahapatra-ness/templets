var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var filter = require('gulp-filter');
var clean = require('gulp-clean');
var wiredep = require('wiredep').stream;
var concat = require('gulp-concat');
var runSeq = require('run-sequence');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var connect = require('gulp-connect');
var watch = require('gulp-watch');


var path = {
	source:"./app",
	target:"./dist"
};

var webpackConfig = {
      // this is the "entry" file of your app. Think of it as your Angular "app.js" file.
    entry: path.source+"/App.js",     
    // this is the will-be-outputted file you'll reference in your index.html file
    output: {
        filename: "bundle.js",          
    },
    module: {
        loaders: [
           // nothing here yet! We'll add more stuff in Part 2
        ]
    },
    resolve: {
        
    },
    plugins: [
       
    ]
};

gulp.task("webpack", function() {
    return gulp.src(path.source+"/App.js")
    .pipe( gulpWebpack(webpackConfig, webpack) )
    .pipe(gulp.dest(path.target+"/js/"))
});



gulp.task('clean',function() {
return gulp.src(path.target+"/*.*", {read: false})
 .pipe(clean({force: true})); 
});
       
gulp.task('copyLibraryAssets',function() {
	var jsFilter = filter('app/bower_components/**/*.js');
    var cssFilter = filter('app/bower_components/**/*.css');
   return gulp.src(mainBowerFiles())
       .pipe(jsFilter)
	   .pipe(concat('vendor.js'))
       .pipe(gulp.dest(path.target + '/libs/'))
	   .pipe(cssFilter)
	   .pipe(concat('vendor.css'))
       .pipe(gulp.dest(path.target + '/css'))
});

gulp.task('injectIndexHtml',['copyLibraryAssets'],function() {
   return gulp.src(path.target+'/index.html') 
       .pipe(inject(gulp.src(path.target + '/libs/vendor.js',{read: false}),{name: 'bower',relative: true}))
	   .pipe(inject(gulp.src(path.target + '/js/bundle.js',{read: false}),{name: 'webpack',relative: true}))
       .pipe(gulp.dest(path.target))
	   .pipe(connect.reload());
});

 

gulp.task('copyHTML',function() {
   return gulp.src([path.source+"/**/*.html"]) // path to your files
    .pipe(gulp.dest(path.target));;
});

gulp.task('build',function(done){
	runSeq('clean','copyHTML','webpack','injectIndexHtml',done)
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*.js','app/**/*.html','app/**/*.css','app/**/*.sass'], ['build'])
});

gulp.task('serve',['watch'],function() {
  connect.server({
    root: 'dist',
    livereload: true,
	port: 8888
  });
});
gulp.task('default', ['build']);