const express = require('express');

const app = express();

app.get('/cars',(req,res,next) => {
  const cars = [
    {"id": 1, "name": "奔驰大G", "price": 1000000},
    {"id": 2, "name": "宝马A7", "price": 600000},
    {"id": 3, "name": "奥迪A5", "price": 500000},
    {"id": 4, "name": "五菱宏光", "price": 100000}
  ];
  res.send(cars);
});

app.listen(5001,(err) => {
  if(!err) {
    console.log('服务器2已启动，服务地址为http://localhost:5001');
  }
})