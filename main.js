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
  db = require("./models");

db.sequelize.sync();

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);
app.use("/public", express.static("public"));

//express 설정
app.set("layout", "layout");
app.set("layout extractScripts", true);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//homeController 추가
app.get("/", homeController.index, homeController.showIndex);
app.get("/board/:place_name", homeController.board, homeController.showBoard);
app.get("/search", homeController.showDetailSearch);
app.get("/mypage/qna", homeController.showQna);
app.get("/mypage/recommend", homeController.showRecommend);
app.get("/service-intro", homeController.showServiceIntro);

//noticeController 추가
app.get("/notice", noticeController.showNotice);

//postController 추가
app.get("/board/post-writing", postController.showPostWriting);
app.get("/board/post-view/:post_id", postController.showPost);
app.post("/post-writing", postController.create);
//app.get("/board/post-view/post.post_id/delete", postController.deletePost);

//commentController 추가
app.post("/comment/:post_id", commentController.createComment);

//adminController 추가
app.get("/admin-member", adminController.showAdminMember);
app.post("/admin-member/delete", adminController.memberDelete);
app.get("/admin-post", adminController.showAdminPost);
app.get("/admin-analysis", adminController.showAdminAnalysis);
app.get("/admin-qna", adminController.showAdminQna);
app.get("/admin-qna-response", adminController.showAdminQnaResponse);

//mypageController 추가
app.get("/mypage-good-list", mypageController.mypageGood);
app.get("/mypage-reply-list", mypageController.mypageReply);
app.get("/mypage-write-list", mypageController.mypageWrite);
app.get("/chat-list", mypageController.chatList);
app.get("/chat", mypageController.chatStory);

//loginController 추가
app.get("/login", loginController.login);
app.get("/signup", loginController.signup);

//errorController 추가
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
