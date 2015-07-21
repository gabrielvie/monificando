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
        project: {
            public: 'public',
            assets: '<%= project.public %>/assets',
            src: '<%= project.public %>/src',
            scss: [
                '<%= project.src %>/scss/app.scss'
            ]
        },

        watch: {
            sass: {
                files: '<%= project.src %>/scss/**/*.scss',
                tasks: ['sass']
            }
        },

        sass: {
            comp: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= project.assets %>/css/app.min.css' : '<%= project.scss %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass', 'concat','watch']);
};