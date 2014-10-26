module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/**.js']
    },
    less: {
      development: {
        options: {
          paths: ["style/less"]
        },
        files: {
          "dist/style.css": "style/less/main.less"
        }
      },
    },
    copy: {
      build: {
        files: [
          { expand: true, cwd: 'src', src: ['**'], dest: 'build/' },
          { expand: true, cwd: 'lib', src: ['**'], dest: 'build/' }
        ]
      },
      dist: {
        files: [
          { expand: true, cwd: 'build', src: [
            'index.html',
            'manifest.webapp',
          ], dest: 'dist/' },
          { expand: true, cwd:'bower_components', src: [
            'building-blocks/{*.css,images/**,style/*.css,style/{buttons,confirm,drawer,headers,lists,srcolling,seekbars,status}/**}',
            'zepto/zepto.min.js',
            'gaia-icons/**'
          ], dest: 'dist/' },
          { expand: true, src: [
            'icons/*.png'
          ], dest: 'dist/' }
        ]
      }
    },
    execute: {
      target: {
        src: ['src/kodijs/gen_js.js']
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
          'build/templates.js': 'src/views/*.hbs'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/app.js': ['build/app.js'],
        },
        options: {
          alias: ['./bower_components/handlebars/handlebars.min.js:handlebars']
        },
        browserifyOptions: {
          detectGlobals: false
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      main: {
        files: ['src/index.html', 'src/manifest.webapp'],
        tasks: ['copy:build', 'browserify', 'copy:dist']
      },
      scripts: {
        files: ['src/*.js', 'src/cards/*.js'],
        tasks: ['jshint', 'copy:build', 'browserify', 'copy:dist']
      },
      apiscripts: {
        files: ['src/kodijs/**'],
        tasks: ['jshint', 'copy:build', 'execute', 'browserify', 'copy:dist']
      },
      templates: {
        files: ['src/views/*.hbs'],
        tasks: ['jshint', 'copy:build', 'handlebars', 'browserify', 'copy:dist']
      },
      less: {
        files: ['style/**'],
        tasks: ['less']
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'copy:build', 'execute', 'handlebars', 'browserify', 'less', 'copy:dist']);
};
