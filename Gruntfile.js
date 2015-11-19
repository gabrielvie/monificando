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

			// Default Options
    		options: {
				curly: true,
    			eqeqeq: true,
    			eqnull: true,
    			browser: true
			},
			//globals: { angular: true },

			// Options for Deploy on Production
			production: {
				options: {
					devel: false
				},
				src: ['<%= folders.pub.app %>/**/*.js']
			},

			// Options for Development's Enviroment
			development: {
				options: {
					devel: true,
					node: true
				},

				src: ['Gruntfile.js', '<%= folders.pub.app %>/**/*.js']
			}

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
			production: {
				options: {
					compress: true,
					sourceMap: false,
					mangle: false
				},
				files: {
					'<%= folders.pub.assets %>/js/lib.min.js': [
						'<%= bower.components.chartJs %>',
						'<%= bower.components.angular %>',
						'<%= bower.components.angularBootstrap %>',
						'<%= bower.components.angularChartJs %>',
						'<%= bower.components.angularInputMasks %>',
						'<%= bower.components.angularMomentJs %>',
						'<%= bower.components.angularNgStorage %>',
						'<%= bower.components.angularNgTagsInput %>',
                        '<%= bower.components.angularSmartTable %>',
						'<%= bower.components.angularUiMask %>',
						'<%= bower.components.angularUiRouter %>'
					],
					'<%= folders.pub.assets %>/js/app.min.js': ['<%= folders.pub.app %>/**/*.js']
				}
			},
			development: {
				options: {
					compress: false,
					sourceMap: false,
					mangle: false,
					beautify: true
				},
				files: {
					'<%= folders.pub.assets %>/js/lib.min.js': [
                        '<%= bower.components.chartJs %>',
                        '<%= bower.components.angular %>',
                        '<%= bower.components.angularBootstrap %>',
                        '<%= bower.components.angularChartJs %>',
                        '<%= bower.components.angularInputMasks %>',
                        '<%= bower.components.angularNgStorage %>',
                        '<%= bower.components.angularNgTagsInput %>',
                        '<%= bower.components.angularSmartTable %>',
                        '<%= bower.components.angularUiMask %>',
                        '<%= bower.components.angularUiRouter %>'
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
                files: '<%= jshint.development.src %>',
                tasks: ['jshint:development', 'uglify:development']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');

    grunt.registerTask('default', ['scsslint', 'jshint:development', 'sass', 'uglify:development', 'watch']);
    grunt.registerTask('prod', ['scsslint', 'jshint:production', 'sass', 'uglify:production']);
};
