const port = 80,
  express = require("express"),
  app = express(),
  path = require("path"),
  layouts = require("express-ejs-layouts"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  noticeController = require("./controllers/noticeController"),
  postController = require("./controllers/postController"),
  adminController = require("./controllers/adminController"),
  mypageController = require("./controllers/mypageController"),
  loginController = require("./controllers/loginController"),
  commentController = require("./controllers/commentController"),
  noteController = require("./controllers/noteController"),
  db = require("./models/index"),
  flash = require("connect-flash"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  passport = require("passport");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploadFiles/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage: storage });

db.sequelize.sync();
const User = db.user;

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);
app.use("/public", express.static("public"));

//express 설정
app.set("layout", "layout");
app.set("layout extractScripts", true);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser("secret"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

//homeController 추가
app.get("/", homeController.index, homeController.showIndex);
app.get("/search", homeController.showDetailSearch);
app.get("/service-intro", homeController.showServiceIntro);

//noticeController 추가
app.get("/notice", noticeController.showNotice);
app.post("/notice/check/", noticeController.checkNotice);

//postController 추가
app.get("/board", homeController.board, homeController.showBoardBase);
app.get("/board/post-writing",loginController.checkLogin, postController.showPostWriting);
app.get("/board/post-view/:post_id", postController.showPost);
app.post("/board/post-view/:post_id/delete", postController.deletePost);
app.get("/board/post-view/:post_id/edit",postController.showPostEdit);
app.post("/board/post-view/:post_id/edit", upload.single("newimage"),postController.editPost);
app.post("/board/post-writing", upload.single("image"), postController.createPost);
//app.get("/post-view/:post_id/delete", postController.deletePost);

app.get("/board/:place_name", homeController.board, homeController.showBoard);

//commentController 추가
app.post("/comment/:post_id", commentController.createComment);
app.post("/comment/:post_id/edit", commentController.updateComment);
app.post("/comment/:post_id/delete", commentController.deleteComment);

//adminController 추가
app.get("/admin/member", adminController.showAdminMember);
app.post("/admin/member/delete", adminController.memberDelete);
app.get("/admin/post", adminController.showAdminPost);
app.post("/admin/post/delete", adminController.postDelete);
// app.get("/admin/analysis", adminController.showAdminAnalysis);
app.get("/admin/qna", adminController.showAdminQna);
app.get("/admin/qna/response/:qna_id", adminController.showAdminQnaResponse);
app.post("/admin/qna/response/:qna_id", adminController.qnaResponse);

//mypageController 추가
app.get("/mypage", mypageController.mypageGood);
app.get("/mypage/qna", loginController.checkLogin, mypageController.qna, mypageController.showQna);
app.get("/mypage/qna/:qna_id", mypageController.qna, mypageController.showQna);


app.get("/mypage/recommend", mypageController.recommend, mypageController.showRecommend);
app.get("/mypage/comment", mypageController.mypageReply);
app.post("/mypage/comment/delete", mypageController.mypageCommentDelete);
app.get("/mypage/post", mypageController.mypageWrite);
app.post("/mypage/post/delete", mypageController.mypagePostDelete);
// app.get("/mypage/repair", mypageController.mypageRepair);
app.get("/mypage/passwordCheck", mypageController.showPasswordCheck);
app.get("/mypage/update", loginController.checkLogin, mypageController.showUpdate);
app.post("/mypage/update", mypageController.logout, mypageController.passwordCheck);
app.post("/mypage/:id/edit", mypageController.edit, mypageController.redirectView);

//noteController 추가
app.post("/note/write", noteController.noteWrite);
app.get("/note/:type", noteController.noteList);
app.get("/chat/write", noteController.chatStory);

//loginController 추가
app.get("/users/login", loginController.login);
app.post(
  "/users/login",
  loginController.authenticate,
  loginController.redirectView
);

app.get("/users/logout", loginController.logout, loginController.redirectView);
app.get("/users/signup", loginController.signup);
app.get("/users/create", loginController.signupSuccess);
app.post("/users/create", loginController.create, loginController.redirectView);
app.post("/users/:id/delete", loginController.delete, loginController.redirectView);

//errorController 추가
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
