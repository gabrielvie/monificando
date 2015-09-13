/*!
 * Monificando Grunfile
 * http://www.monificando.com/
 * @author Gabriel Santos
 */

/*global module */
module.exports = function (grunt) {
    'use strict';
    /**
     * Configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        folders: {
            pub: {
                app: 'public/app',
                assets: 'public/assets',
                src: 'public/src',
                lib: '<%= folders.pub.src %>/lib',
                scss: '<%= folders.pub.src %>/scss'
            },
            bower: {
                components: 'bower_components'
            }
        },

        jshint: {
            files: ['Gruntfile.js', '<%= folders.pub.app %>/**/*.js']
        },

        scsslint: {
            allFiles: ['<%= folders.pub.scss %>/**/*.scss'],
            options: {
                bundleExec: false,
                config: '<%= folders.pub.scss %>/scsslint.yml',
                colorizeOutput: true,
                exclude: '<%= folders.pub.scss %>/vendors/**/*.scss'
            }
        },

        sass: {
            comp: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= folders.pub.assets %>/css/app.min.css' : '<%= folders.pub.scss %>/app.scss'
                }
            }
        },

        uglify: {
            options: {
                compress: true,
                sourceMap: true,
                mangle: false
            },
            build: {
                files: {
                    '<%= folders.pub.assets %>/js/lib.min.js': [
                        '<%= bower.components.chartJs %>',
                        '<%= bower.components.angular %>',
						'<%= bower.components.angularBootstrap %>',
                        '<%= bower.components.angularUiRouter %>',
                        '<%= bower.components.angularChartJs %>'
                    ],
                    '<%= folders.pub.assets %>/js/app.min.js': ['<%= folders.pub.app %>/**/*.js']
                }
            }
        },

        watch: {
            sass: {
                files: '<%= folders.pub.scss %>/**/*.scss',
                tasks: ['scsslint', 'sass']
            },
            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');

    grunt.registerTask('default', ['scsslint', 'jshint', 'sass', 'uglify', 'watch']);
    grunt.registerTask('homolog', ['scsslint', 'jshint', 'sass', 'uglify']);
};
