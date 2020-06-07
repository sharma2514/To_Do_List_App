const Task = require('../models/task');

module.exports.home = function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }
        return res.render('home', { 
            title : "TODO App",
            task_list : tasks
        }); 
    });  
}
