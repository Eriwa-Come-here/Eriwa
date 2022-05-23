const port = 80,
  express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  errorController = require("./controllers/errorController");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

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

//postController추가
app.get("/board/post-writing", postController.showPostWriting);

//errorController 추가
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
