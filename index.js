const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
//where r u?
// done
// not deleting

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

var taskList = []

const db = require('./config/mongoose');
const Task = require('./models/task');


app.use(express.urlencoded());
app.use(express.static('assets'));



app.post('/create-task', function(req, res){
    // pushing in database
    Task.create({
        task: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newTask){
        if(err){
            console.log('Error in creating a task!');
            return;
        }
        console.log('******', newTask);
        return res.redirect('back');
    });
});

app.post("/deletetask",function(req,res){
    console.log(req.body);
    let taskId = Object.keys(req.body);
    for(task of taskId){
        Task.deleteOne({_id:task},function(err){
            if(err){
                console.log("Error in deleting from database.",err);
                return;
            }
        });
    }
    return res.redirect("back");
});

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});