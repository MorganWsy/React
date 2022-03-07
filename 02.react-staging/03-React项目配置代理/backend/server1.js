const express = require('express');

const app = express();
// app.use((req,res,next) => {
//   next();
// });
app.get('/students',(req,res,next) => {
  const students = [
    {"id": 1, "name": "www", "age": 21, "gender": "female"},
    {"id": 2, "name": "wsy", "age": 21, "gender": "male"},
    {"id": 3, "name": "wzy", "age": 22, "gender":"male"},
    {"id": 4, "name": "wdd", "age": 21, "gender": "male"}
  ];
  res.send(students);
});

app.listen(5000,(err) => {
  if(!err){
    console.log('服务器1已启动，服务地址为http://localhost:5000');
  }
});