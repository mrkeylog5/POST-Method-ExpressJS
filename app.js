var express = require("express");
var app = express();
var port = 3000;

var todoList = [
  { todo: "nau com" },
  { todo: "Quet nha" },
  { todo: "Rua chem" },
  { todo: "Hoc code tai CodersX" }
];

//req.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//pug
app.set("views", "./views");
app.set("view engine", "pug");

//listen
app.listen(port, () => {
  console.log("sever listen on port " + port);
});

app.get("/todos", function(req, res) {
  res.render("index.pug", {
    todoList: todoList
  });
});

app.get("/todos/search", function(req, res) {
  var q = req.query.q;
  var matchTodo = todoList.filter(function(todo) {
    return todo.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index.pug", {
    todoList: matchTodo
  });
});

app.get("/todos/create", function(req, res) {
  res.render("create.pug");
});
app.post("/create", function(req, res) {
  todoList.push(req.body);
  res.redirect("/todos");
});
