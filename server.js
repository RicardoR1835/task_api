var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require('body-parser');
// configure body-parser to read JSON
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
        default: "",
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
mongoose.Promise = global.Promise;

app.get('/', function(req, res){
Task.find({}, function(err, tasks){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: tasks})
        }
     })
})
app.get('/:id', function(req,res){
    Task.findOne({name: req.params.id}, function(err, task){
        if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully deleted")
            }
            res.json({message: "Success", data: user})
    })
})
app.post('/new', function(req,res){
    var task = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    completed = req.body.completed;
    task.save(function(err){
        if(err){
            console.log("something went wrong", err);
        } else {
            console.log("successfully updated")
            res.redirect('/')
        }
    })
})
app.put('/edit/:id', function(req,res){
    Task.findOne({_id: req.params.id}, function(err,task){
        task.title = req.body.title;
        task.description = req.body.description;
        completed = req.body.completed;
        task.save(function(err){
            if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully updated")
                res.redirect('/')
            }
        })
    })
})
app.delete('/destroy/:id', function(req,res){
    User.findOne({name: req.params.id}, function(err, user){
        user.remove(function(err){
            if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully deleted")
            }
            res.redirect('/')
        })
    })
})


app.listen(8000, function () {
    console.log("listening on port 8000");
})