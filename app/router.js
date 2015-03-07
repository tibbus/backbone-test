define(function () {
    var documents = [
        new Backbone.Model({
            title: 'Javascript 111',
            content: 'this is 1111 text 1111 text 1111 text 1111 text 1111 text 1111 text'
        }),
        new Backbone.Model({
            title: 'Javascript 2222',
            content: 'this is 2222 text 2222 text 2222 text 2222 text 2222 text 2222 text'
        })
    ];

    var ContentsView = Backbone.View.extend({
        tagName: 'ul',
        render: function(){
            _(this.collection).each(function(document){
                this.$el.append(new DocumentListView({model: document}).render().el);
            }, this);
            return this;
        }
    });

    var eventAggregator = _.extend({}, Backbone.Events);

    var DocumentListView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': function(){
                eventAggregator.trigger('document:selected', this.model);
            }
        },
        render: function(){
            this.$el.html(this.model.get('title'));
            return this;
        }
    });

    var DocumentView = Backbone.View.extend({
        render: function() {
            this.$el.append('<h1>' + this.model.get('title') + '</h1>');
            this.$el.append('<div>' + this.model.get('content') + '</div>');
            return this;
        }
    });

    var DocumentRouter = Backbone.Router.extend({
        routes: {
            'contents': 'contents',
            'view/:title': 'viewDocument'
        },
        contents: function(){
            $('body').html(new ContentsView({collection: documents}).render().el);
        },
        viewDocument: function(title){
            var selectedDocument = _(documents).find(function(document){
                return document.get('title') === title;
            });
            $('body').empty().append(new DocumentView({model: selectedDocument}).render().el);
        }
    });

    eventAggregator.on('document:selected', function(document){
        var urlPath = 'view/' + document.get('title');
        router.navigate(urlPath, {trigger: true});
    });

    var router = new DocumentRouter();
    Backbone.history.start();

    router.navigate('contents', {trigger:true});


});
