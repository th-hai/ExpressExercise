// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

var todoLists = [
{ id: 1, content: 'Đi chợ'},
{ id: 2, content: 'Nấu cơm'},
{ id: 3, content: 'Rửa bát'},
{ id: 4, content: 'Học code tại CodersX'}
];

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index', {
    todoLists: todoLists
  });
});

app.get('/todos', (request, response) => {
  var q = request.query.q;
  var matchedToDo = todoLists.filter(function(todo) {
    return todo.content.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  response.render('todo', {
    todoLists: matchedToDo
  });
  //var urlParams = new URLSearchParams(window.location.search);
  //var queryValue = urlParams.get('q');
  var input = document.getElementsByName('q');
  input[0].value = q;
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
