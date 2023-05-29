let webSocketServer = require("./src/websocket.js");
let chatWebSocketServer = require("./src/chatWebSocket.js");
let app=require("./src/server")
//webSocketServer();
chatWebSocketServer()
const os = require("os");
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

// 通过ap.listen进行服务器的配置，并启动服务器，接收两个配置参数，一个是对应的端口号，一个是启动成功的回调函数
app.listen(9588, () => {
  console.log("服务器启动成功");
  console.log(getIPAdress())
});
