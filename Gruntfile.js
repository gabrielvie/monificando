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
        folders: {
            pub: {
                app: 'public/app',
                assets: 'public/assets',
                src: 'public/src',
                lib: '<%= folders.pub.src %>/lib',
                scss: '<%= folders.pub.src %>/scss'
            }
        },

        jshint: {
            files: ['Gruntfile.js', '<%= folders.pub.app %>/**/*.js'],
            options: {
                globals: {
                    angular: true,
                    module: true
                }
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
                sourceMap: true
            },
            build: {
                files: {
                    //'<%= folders.pub.assets %>/js/app.min.js': ['<%= folders.pub.lib %>/angular/angular.min.js','<%= folders.pub.app %>/**/*.js']
                    '<%= folders.pub.assets %>/js/app.min.js': ['<%= folders.pub.app %>/**/*.js']
                }
            }
        },

        watch: {
            sass: {
                files: '<%= folders.pub.scss %>/**/*.scss',
                tasks: ['sass']
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

    grunt.registerTask('default', ['jshint', 'sass', 'uglify', 'watch']);
};
