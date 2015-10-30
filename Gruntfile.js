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
			production: {
				options: {
				  	globals: {
						angular: true,
						console: false
				  	}
				},
            	src: ['Gruntfile.js', '<%= folders.pub.app %>/**/*.js']
			},
			development: {
				options: {
				  	"globals": {
						"angular": true,
						"console": true,
				  	}
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
						'<%= bower.components.angularNgStorage %>',
						'<%= bower.components.angularNgTagsInput %>',
						'<%= bower.components.angularSmartTable %>',
						'<%= bower.components.angularUiRouter %>'
					],
					'<%= folders.pub.assets %>/js/app.min.js': ['<%= folders.pub.app %>/**/*.js']
				}
			},
			development: {
				options: {
					compress: false,
					sourceMap: true,
					mangle: false
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
                files: '<%= jshint.files %>',
                tasks: ['jshint:development', 'uglify:development']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');

    grunt.registerTask('devel', ['scsslint', 'jshint:development', 'sass', 'uglify:development']);
    grunt.registerTask('prod', ['scsslint', 'jshint:production', 'sass', 'uglify:production']);
};
