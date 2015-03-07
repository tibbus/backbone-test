define(function () {
    var Rectangle = Backbone.Model.extend({});
    
    var RectangleView = Backbone.View.extend({
        el: '#test',
        render: function(){
            this.setColor();
            return this;
        },
        setColor: function(){
            this.$el.css('background-color', this.model.get('color'));
        },
    });

    var rectangle = new Rectangle({color: 'blue'});
    var rectangleView = new RectangleView({model: rectangle}).render();
});