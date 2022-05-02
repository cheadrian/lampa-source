/** Что-бы все не пропало! **/
process.on('uncaughtException', function (err) {
    console.log(err)
});


const { src, dest, series, parallel } = require('gulp');

var concat         = require('gulp-concat'),
    chokidar       = require('chokidar'),
    uglify         = require('gulp-uglify-es').default,
    browser        = require('browser-sync').create(),
    newer          = require('gulp-newer'),
    sass           = require('gulp-sass')(require('sass')),
    autoprefixer   = require('gulp-autoprefixer'),
    fs             = require('fs');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rollup = require('@rollup/stream');

// *Optional* Depends on what JS features you want vs what browsers you need to support
// *Not needed* for basic ES6 module import syntax support
var babel = require('@rollup/plugin-babel').babel;
// Add support for require() syntax
var commonjs = require('@rollup/plugin-commonjs');
// Add support for importing from node_modules folder like import x from 'module-name'
var nodeResolve = require('@rollup/plugin-node-resolve');
//i18n-scanner
const gulp = require('gulp');
const sort = require('gulp-sort');
const scanner = require('i18next-scanner');
const parser = import('i18next-parser');
const hash = require('sha1');
const parse5 = require('parse5');
const ensureArray = require('ensure-array');

var cache;

var srcFolder = './src/';
var dstFolder = './dest/';
var pubFolder = './public/';
var bulFolder = './build/';
var idxFolder = './index/';
var plgFolder = './plugins/';

//Modify parseAttrFromString to use HTML DOM value as defaultValue for key i18next-scanner
const customTransform = function _transform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);

    const attrs = ensureArray(['data-i18n']);

    const ast = parse5.parse(content);

    const parseAttributeValue = (key, node) => {
        //key = _.trim(key);
        if (key.length === 0) {
            return;
        }
        if (key.indexOf('[') === 0) {
            const parts = key.split(']');
            key = parts[1];
        }
        if (key.indexOf(';') === (key.length - 1)) {
            key = key.substr(0, key.length - 2);
        }
        parser.set(key, node.childNodes[0].value);
    };

    const walk = (nodes) => {
        nodes.forEach(node => {
            if (node.attrs) {
                node.attrs.forEach(attr => {
                    if (attrs.indexOf(attr.name) !== -1) {
                        const values = attr.value.split(';');
                        values.forEach((item, index) => parseAttributeValue(item, node));
                    }
                });
            }
            if (node.childNodes) {
                walk(node.childNodes);
            }
            if (node.content && node.content.childNodes) {
                walk(node.content.childNodes);
            }
        });
    };
    walk(ast.childNodes);
    
    done();
};

function i18next_scan() {
    return gulp.src(['src/**/*.{js,html}'])
        .pipe(sort()) // Sort files in stream by path
        .pipe(scanner({
            lngs: ['en', 'ru'], // supported languages
            attr: {
                list: ['data-i18n'],
                extensions: ['.html', '.htm', '.js', '.jsx']
            },
            func: {
                list: ['i18next.t', 'i18n.t'],
                extensions: ['.js', '.jsx']
            },
            //defaultValue: '',
            resource: {
                // the source path is relative to current working directory
                loadPath: pubFolder + 'locales/{{lng}}/{{ns}}.json',
                
                // the destination path is relative to your `gulp.dest()` path
                savePath: 'locales/{{lng}}/{{ns}}.json'
            }
        }, customTransform))
        .pipe(gulp.dest(pubFolder));
}

gulp.task('i18next', i18next_scan);

function merge(done) {
    let plugins = [babel({
        presets: ['@babel/preset-env']
    }), commonjs, nodeResolve]

    rollup({
        // Point to the entry file
        input: srcFolder+"app.js",

        // Apply plugins
        plugins: plugins,

        // Use cache for better performance
        cache: cache,

        // Note: these options are placed at the root level in older versions of Rollup
        output: {
          // Output bundle is intended for use in browsers
          // (iife = "Immediately Invoked Function Expression")
          format: 'iife',
        }
      })
      .on('bundle', function(bundle) {
        // Update cache data after every bundle is created
        cache = bundle;
      })

      // Name of the output file.
      .pipe(source('app.js'))
      .pipe(buffer())
      //.pipe(uglify())
      // Where to send the output file
      .pipe(dest(dstFolder));
      
    done();
}


function bubbleFile(name){
    let plug = [babel({
        presets: ['@babel/preset-env']
    }), commonjs, nodeResolve]

    rollup({
        input: plgFolder+name,
        plugins: plug,
        output: {
          format: 'iife',
        }
      })
      .pipe(source(name))
      .pipe(buffer())
      .pipe(dest(dstFolder));
}

function plugins(done) {
    fs.readdirSync(plgFolder).filter(function (file) {
        return fs.statSync(plgFolder+'/'+file).isDirectory();
    }).forEach(folder => {
        bubbleFile(folder+'/'+folder+'.js')
    });
      
    done();
}

var copy_timer;

/** Обновляем файл для WEB **/
function build_web(done){
    clearTimeout(copy_timer)

    //таймер сила!
    copy_timer = setTimeout(()=>{
        src([dstFolder+'app.js']).pipe(dest(bulFolder+'web/'));

        fs.readdirSync(dstFolder).filter(function (file) {
            return fs.statSync(dstFolder+'/'+file).isDirectory();
        }).forEach(folder => {
            src([dstFolder+folder+'/'+folder+'.js']).pipe(dest(bulFolder+'web/plugins'));
        });
    },500)

    done();
}

/** Публикуем для WEB платформы **/
function public_task(path){
    return src(dstFolder + '/app.min.js').pipe(dest(bulFolder+path));
}

function public_webos(){
    return public_task('webos/');
}
function public_tizen(){
    return public_task('tizen/');
}
function public_github(){
    return public_task('github/lampa/');
}

function index_webos(){
    return src(idxFolder + '/webos/**/*').pipe(dest(bulFolder+'webos/'));
}
function index_tizen(){
    return src(idxFolder + '/tizen/**/*').pipe(dest(bulFolder+'tizen/'));
}
function index_github(){
    return src(idxFolder + '/github/**/*').pipe(dest(bulFolder+'github/lampa/'));
}

/** Сверяем файлы **/
function sync_task(path){
    return src([pubFolder + '**/*'])
        .pipe(newer(bulFolder+path))
        .pipe(dest(bulFolder+path));
}

function sync_web(){
    return sync_task('web/');
}
function sync_webos(){
    return sync_task('webos/');
}
function sync_tizen(){
    return sync_task('tizen/');
}
function sync_github(){
    return sync_task('github/lampa/');
}

/** Следим за изменениями в файлах **/
function watch(done){
    i18next_scan()
    var watcher = chokidar.watch([srcFolder,pubFolder,plgFolder], { persistent: true});

    var timer;
    var change = function(path){
        clearTimeout(timer)

        if(path.indexOf('app.css') > -1) return;
        timer = setTimeout(
            series(merge, plugins, sass_task, sync_web, build_web)
        ,100)
    }

    watcher.on('add', function(path) {
        console.log('File', path, 'has been added');

        change(path)
    })
    .on('change', function(path) {
        console.log('File', path, 'has been changed');

        change(path)
    })
    .on('unlink', function(path) {
        console.log('File', path, 'has been unlink');

        change(path)
    })

    done();
}

function browser_sync(done) {
    browser.init({
        server: {
            baseDir: bulFolder+'web/'
        },
        open: false,
        notify: false,
        ghostMode: false,
    });

    done();
}

function sass_task(){
    return src(srcFolder+'/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 100 versions', '> 1%', 'ie 8', 'ie 7', 'ios 6', 'android 4'], { cascade: true })) // Создаем префиксы
        .pipe(dest(pubFolder+'/css'))
        .pipe(browser.reload({stream: true}))
}

function uglify_task() {
    return src([dstFolder+'app.js']).pipe(concat('app.min.js')).pipe(dest(dstFolder));
}

function test(done){
    done();
}

exports.pack_webos   = series(sync_webos, uglify_task, public_webos, index_webos);
exports.pack_tizen   = series(sync_tizen, uglify_task, public_tizen, index_tizen);
exports.pack_github  = series(sync_github, uglify_task, public_github, index_github);
exports.pack_plugins = series(plugins);
exports.test         = series(test);

exports.default = parallel(i18next_scan, watch, browser_sync);
