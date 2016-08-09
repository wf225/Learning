var deploysheet_parser = require("./models/deploysheet/deploysheet_parser");

module.exports = function (app) {

    // RESTful api example ---------------------------------------------------------------------
    /*
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

  app.route('/book')
    .get(function(req, res) {
      res.send('Get a random book: Haa');
    })
    .post(function(req, res) {
      res.send('Add a book');
    })
    .put(function(req, res) {
      res.send('Update the book');
    });
  */
  // RESTful api example ---------------------------------------------------------------------

  app.get('/api/deploysheet/instance', function (req, res) {
    deploysheet_parser.getDistributionByInstance(function(data){
      res.end( data );
    });
  });

  app.get('/api/deploysheet/branch', function (req, res) {
    deploysheet_parser.getDistributionByBranch(function(data){
      res.end( data );
    });
  });

  // else
  app.get('/api/*', function (req, res) {
    //res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    res.send('Invalid RESTful api.');
  });

};