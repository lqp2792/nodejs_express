/**
 * Created by phule on 29/07/2014.
 */
module.exports = function(grunt) {
  [
      'grunt-cafe-mocha',
      'grunt-contrib-jshint',
      'grunt-exec'
  ].forEach(function(task) {
         grunt.loadNpmTasks(task);
    });
    grunt.initConfig({
        cafemocha : {
            all : {
                src : 'qa/test-*.js',
                option : { ui : 'tdd', timeout: 15000}
            }
        },
        jshint : {
            app : ['Meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa : ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
        },
        exec : {
            linkchecker : {cmd : 'linkchecker http://localhost:3000'}
        }
    });

    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};