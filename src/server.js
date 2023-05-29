//导入express
const express = require("express");

let { write } = require("./fileWrite");
//创建web服务器
const app = express();
//配置解析表单数据(application/x-www-form-urlencoded)格式的中间件
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log("设置跨域响应头");
  console.log(req.method + " " + req.url);
  // 所有的接口都可以访问
  res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
  res.header("Access-Control-Allow-Headers", "*"); //自定义中间件，设置跨域需要的响应头。
  next();
});

const login = require("../router/login");
app.use("/login", login);

const getFeature = require("../router/feature");
app.use("/feature", getFeature);

const file_CZ = require("../router/file");
app.use("/file", file_CZ);

//测试用接口
//get接口的开发
app.get("/data", (err, res) => {
  let userData = require("../data/user.json");
  console.log(userData);
  res.status(400).send({
    code: 200,
    data: userData,
  });
});

app.post("/insert", (req, res) => {
  let newList = req.body;
  console.log(newList);
  write(
    "user.json",
    (arr) => {
      let obj = { userId: arr.length + 1, ...newList};
      //2.1.给数组添加元素
      arr.push(obj);
      return {arr,obj}
    },
    (newData) => {
      res.send({
        code: 200,
        data: newData,
      });
    }
  );
});

module.exports = app;
