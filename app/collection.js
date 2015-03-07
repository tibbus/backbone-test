define(function () {
    var Vehicle = Backbone.Model.extend({});

    var Vehicles = Backbone.Collection.extend({
        model: Vehicle,
        comparator: function(vehicle1, vehicle2){
            return vehicle1.get('sequence') < vehicle2.get('sequence') ? -1 : 1;
        }
    },
    {
        oneVehicle: function(){
            return new Vehicle({color: 'green'});
        }
    }
    );

    var vehicles = new Vehicles([
        {color: 'red', sequence: 2},
        {color: 'blue', sequence: 1}
    ]);

    console.log(JSON.stringify(vehicles));

});
