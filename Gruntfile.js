/*!
 * Monificando Grunfile
 * http://www.monificando.com/
 * @author Gabriel Santos
 */

'use strict';

/**
 * Grunt Module
 */
module.exports = function(grunt) {

    /**
     * Configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'style/app.css' : 'sass/app.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'watch']);
};