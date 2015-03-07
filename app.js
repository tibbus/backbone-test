requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        app: '../app',
        backbone: 'backbone/backbone',
        underscore: 'underscore/underscore',
        jquery: 'jquery/dist/jquery'
    },
    shim: {
    	underscore: {
    		exports: '_'
    	}
    },
    backbone: {
    	deps: ['underscore', 'jquery'],
    	exports: 'Backbone'
    }
});

require(['app/main']);