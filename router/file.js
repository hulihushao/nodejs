// category路由文件
const express = require("express");
const router = express.Router();

router.post("/upLoad", (req, res) => {
  console.log(req.body);
  
});
// 导出
module.exports = router;
