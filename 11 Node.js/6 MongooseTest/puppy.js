var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    //connected //everything derived from Schema
    var puppySchema = new mongoose.Schema({
        name: String,
        age: Number
    });
    //a model is a class used to construct documents (here a Puppy as declared above)
    var Puppy = mongoose.model('Puppy', puppySchema);
    //models can have methods attached (eg. puppy.speak() or .Create())
    
    // var bear = new Puppy({
    //     name: 'Bear',
    //     age: 1
    // });

    // bear.save(function (err, bear){
    //     if(err) return console.error(err);
    //     bear.name;
    // });

    Puppy.find((err, puppies) => {
        if (err) return console.log(err);
        console.log(puppies);
    });

});