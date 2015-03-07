define(function () {
    var Rectangle = Backbone.Model.extend({
        validate: function(attrs) {
            var validColors = ['white', 'red', 'blue', 'yellow', 'green'];
            var colorIsValid = function (attrs) {
                if (!attrs.color) {
                    return true;
                }
                return _(validColors).include(attrs.color);
            }
            if(!colorIsValid(attrs)){
                return 'color must be one of:' + validColors.join(',');
            }
        }
    });
    
    var RectangleView = Backbone.View.extend({
        tagName: 'div',
        className: 'rectangle',
        events: {
            'click': 'move'
        },
        render: function(){
            this.setDimensions();
            this.setPosition();
            this.setColor();
            return this;
        },
        setDimensions: function(){
            this.$el.css({
                width: this.model.get('width') + 'px',
                height: this.model.get('height') + 'px'
            })
        },
        setPosition: function() {
            var position = this.model.get('position');
            this.$el.css({
                left: position.x,
                top: position.y,
                position: 'relative'
            })
        },
        setColor: function(){
            this.$el.css('background-color', this.model.get('color'));
        },
        move: function(){
            console.log('click'); 
            this.$el.css('left', this.$el.position().left + 10);
        }
    });

    var rectangle = new Rectangle({
        width: 100,
        height: 60,
        position: {
            x: 300,
            y: 150
        },
        color: 'green'
    });

    var rectangleView = new RectangleView({model: rectangle});
    $('div#canvas').append(rectangleView.render().el);

    rectangle.on('invalid', function(model, error) {
       console.log(error);
    });
    // add observer just for color attribute :
    rectangle.on('change:color', function(){
            rectangleView.render();
    })
    // color is valid, set the new color:
    rectangle.set('color', 'red', {validate : true});
    // color is invalid, will not bet set and will throw and error
    rectangle.set('color', 'mov', {validate : true});

    // add global observer ::
    rectangle.on('change', function(){
            rectangleView.render();
    })
    rectangle.set('height', 200);
});
