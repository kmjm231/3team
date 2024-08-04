"use strict";

const express = require("express"),
    app = express(),
    path = require('path'),
    homeController = require("./controllers/homeController"), // 메인 로그인
    errorController = require("./controllers/errorController"), // 에러 관련
    subscriberController = require("./controllers/subscriberController"), // 회원가입 및 회원 정보
    machineController = require("./controllers/machineController"),
    reservationController = require("./controllers/reservationController"),
    userHomeController = require("./controllers/userHomeController"),
    userMachineController = require("./controllers/userMachineController"),
    weatherController = require("./controllers/weatherController"),
    statisticController = require("./controllers/statisticController"),
    noticeController = require("./controllers/noticeController"),
    showNoticeController = require("./controllers/showNoticeController"),
    usersController = require("./controllers/usersController"), // 로그인 인증 및 로그아웃
    //userController = require("./controllers/userController"),
    reviewsController = require("./controllers/reviewsController"),
    userUsingController = require("./controllers/userUsingController"), //잔여 시간 관련 
    layouts = require("express-ejs-layouts"),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    cookieParser = require("cookie-parser"),
    passport = require("passport"),
    bcrypt = require('bcrypt'),
    db = require("./models/index"),
    Sequelize = db.Sequelize,
    Op = Sequelize.Op;

db.sequelize.sync(); // 모델 동기화
const Subscriber = db.subscriber;
const Machine = db.machine;
const Reservation = db.reservation;

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs"); // 애플리케이션 뷰 엔진을 ejs로 설정
app.set('views', path.join(__dirname, 'views'));
// 정적 뷰 제공
app.use(express.static("public"));
// 레이아웃 설정
app.use(layouts);
// 데이터 파싱
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: true }));
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// 라우트 등록
app.get("/subscribers/getSubscriber", subscriberController.getAllSubscribers);
app.get("/subscribers/subscriber", subscriberController.getSubscriptionPage); // 폼 입력이 가능한 웹 페이지 렌더링
app.post("/subscribers/subscriber", subscriberController.saveSubscriber); // 넘겨받은 POST 데이터 저장 및 처리
app.get('/logout', usersController.logout);

app.post("/reservations", reservationController.createReservation); //안 되면 지울 거

app.get("/user/userHome", userHomeController.getUserReservations);
//app.get("/user/userMain", userController.showIndex1);
app.get("/user/userReserve", reservationController.getAllReservations);
app.get("/user/userUsing", userUsingController.getUserUsingPage); // userUsing 페이지 라우트 추가
app.get("/user/userMachine",userMachineController.getUserMachines);

app.get("/manager/getMachine",machineController.getAllMachines);
app.get("/manager/getReservation",reservationController.getAllReservations);
app.get("/manager/getStatistic", statisticController.getAllStatistics);
app.get('/manager/getNotice', noticeController.getNoticePage);
app.post('/manager/getNotice', noticeController.createNotice);

app.get('/showNotice', showNoticeController.getAllNotices);
app.use("/getWeather", weatherController);

app.get("/", homeController.showIndex);
app.post("/", usersController.authenticate, usersController.redirectView);
app.get("/reviews/getReviews", reviewsController.getAllReviews);
app.get("/reviews/writeReviews", reviewsController.getReviewsPage);
app.post("/reviews/writeReviews", reviewsController.saveReviews);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});
