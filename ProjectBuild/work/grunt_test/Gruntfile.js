module.exports = function (grunt) {

    // 初始化配置grunt任务
    grunt.initConfig({
        concat: {//任务名
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/js/demo1.js', 'src/js/demo2.js'],
                dest: 'dist/js/bundle.js',
            },
        },
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            my_target: {
                files: {
                    'dist/build/bundle.min.js': ['dist/build/bundle.js']
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['env']
            },
            dist: {
                files: {
                    'dist/build/bundle.js': 'dist/js/bundle.js'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: ['Gruntfile.js', 'src/js/*.js']
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/build.min.css': ['src/css/*.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js','src/css/*.css'],
                tasks: ['concat','babel','uglify','jshint','cssmin'],
                options: {
                    spawn: false, //变量更新. true: 全量更新。
                }
            }
        }
    });

    //grunt任务执行时去加载对应的任务插件。
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //注册构建任务。执行任务是同步的。
    grunt.registerTask('default', ['concat','babel','uglify','jshint','cssmin']);
    grunt.registerTask('myWatch',['default','watch']);

};