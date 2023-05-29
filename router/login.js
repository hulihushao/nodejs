// category路由文件
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  let { userName, pwd } = req.body;
  let userData = require("../data/user.json");
  let one = userData.filter((item) => item.userName == userName);
  if (one.length) {
    if (one[0].pwd == pwd) {
      res.send({
        code: 200,
        data: [{userId:one[0].userId,userName:one[0].userName}],
      });
    } else {
      res.status(500).send({
        code: 500,
        message: "密码错误",
      });
    }
  } else {
    res.status(404).send({
      code:404,
      message:"用户不存在"
    })
  }
});
// 导出
module.exports = router;
