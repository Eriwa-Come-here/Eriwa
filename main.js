const port = 80,
  express = require("express"),
  app = express(),
  path = require("path"),
  layouts = require("express-ejs-layouts"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  postController = require("./controllers/postController"),
  adminController = require("./controllers/adminController");

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

//ejs 파일 렌더링 추가
app.get("/", (req, res) => {
  res.render("index");
});

//homeController 추가
app.get("/", homeController.showIndex);
app.get("/board", homeController.showBoard);
app.get("/search", homeController.showDetailSearch);
app.get("/qna", homeController.showQna);
app.get("/recommend", homeController.showRecommend);
app.get("/service-intro", homeController.showServiceIntro);

//postController추가
app.get("/board/post-writing", postController.showPostWriting);
app.get("/board/post-view", postController.showPost);

//adminController추가
app.get("/admin-member", adminController.showAdminMember);
app.get("/admin-post", adminController.showAdminPost);
app.get("/admin-analysis", adminController.showAdminAnalysis);
app.get("/admin-qna", adminController.showAdminQna);
app.get("/admin-qna-response", adminController.showAdminQnaResponse);

//errorController 추가
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
