module.exports = function(grunt) {
  "use strict";
  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      source: {
        files: {
          src: ['src/**.js']
        },
        options: {
          jshintrc: '.jshintrc'
        }
      },
      test: {
        files: {
          src: ['test/**.js']
        },
        options: {
          jshintrc: 'test/.jshintrc'
        }
      },
    },
    less: {
      development: {
        options: {
          paths: ["style/less"]
        },
        files: {
          "app/style.css": "style/less/main.less"
        }
      },
    },
    copy: {
      build: {
        files: [
          { expand: true, cwd: 'src', src: ['js/**'], dest: 'build/js' },
          { expand: true, src: 'lib/**', dest: 'build' }
        ]
      },
      dist: {
        files: [
          { expand: true, cwd: 'build', src: [
            'index.html',
            'img.js',
            'manifest.webapp',
          ], dest: 'dist/' },
          { expand: true, cwd:'bower_components', src: [
            'building-blocks/{*.css,images/**,style/*.css,style/{buttons,confirm,drawer,headers,lists,srcolling,seekbars,status,progress_activity}/**/*.{css,png}}',
            'zepto/zepto.min.js',
            'gaia-icons/**'
          ], dest: 'dist/' },
          { expand: true, src: [
            'icons/*.png',
            'assets/**.png'
          ], dest: 'dist/' }
        ]
      }
    },
    handlebars: {
      compile: {
        options: {
          commonjs: true,
          processName: function(filePath) {
            var fname = filePath.split("/").slice(-1)[0].replace('-','_');
            return fname.substr(0, fname.indexOf('.'));
          }
        },
        files: {
          'src/views/template_src.js': 'src/views/*.hbs'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        stage: 0,
        modules: 'common'
      },
      test: {
        files: [
          { expand: true, cwd: 'test', src: ['**/*.js'], dest: 'build/test' },
        ]
      },
      source: {
        files: [
          { expand: true, cwd: 'src', src: ['**/*.js'], dest: 'build/js' },
        ]
      }
    },
    browserify: {
      source: {
        files: {
          'app/main.browserified.js': ['node_modules/babel/polyfill.js', 'build/js/main.js'],
        },
        options: {
          alias: ['./bower_components/handlebars/handlebars.min.js:handlebars']
        },
        browserifyOptions: {
          detectGlobals: false,
          debug: true
        }
      },
      test: {
        files: {
          'build/test.browserified.js': ['node_modules/babel/polyfill.js', 'build/test/**/*.js'],
        },
        options: {
          alias: ['./bower_components/handlebars/handlebars.min.js:handlebars']
        },
        browserifyOptions: {
          detectGlobals: false,
          debug: true
        }
      }
    },
    watch: {
      default: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['newer:copy:build', 'newer:babel:source', 'newer:babel:test', 'browserify', 'jasmine']
      },
      templates: {
        files: ['src/views/*.hbs'],
        tasks: ['handlebars']
      },
      less: {
        files: ['style/**'],
        tasks: ['less']
      }
    },
    jasmine: {
      src: 'test/dummy.js',
      options: {
        specs: 'build/test.browserified.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  /*
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-newer');
  */

  // Default task(s).
  grunt.registerTask('default', [
      'jshint',
      'handlebars',
      'copy:build',
      'babel:source',
      'babel:test',
      'browserify',
      'less',
      'jasmine',
      'watch'
  ]);
};
