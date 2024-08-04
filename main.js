"use strict";

const fs = require("fs"),
  port = 80,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  router = require("./router"),
  plainTextContentType = {
    "Content-Type":"text/plain"
  },
  htmlContentType = {
    "Content-Type":"text/html"
  },
  customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
          if (errors) {
            console.log("Error reading the file...");
          }
          res.end(data);
    });
  };
router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile("views/userHome.html", res);
});
router.get("/userMain", (req, res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/userMain.html", res);
});
router.get("/userReserve", (req, res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/userReserve.html", res);
});
/*>>>>>>> 8b9cb3bed2ac370d6e45393ac39de0ca9959ddca*/

http.createServer(router.handle).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
const express = require("express"),
    app = express(),
    path = require('path'),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts"),
    db = require("./models/index"),
    Sequelize = db.Sequelize,
    Op = Sequelize.Op;
app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs"); // 애플리케이션 뷰 엔진을 ejs로 설정
app.set('views', path.join(__dirname, 'views'));
// 정적 뷰 제공
app.use(express.static("public"));
// 레이아웃 설정
//app.use(layouts);
// 데이터 파싱
app.use(
    express.urlencoded({
        extended:false
    })
);
app.use(express.json());

// 라우트 등록
app.get("/", homeController.showIndex);
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});
