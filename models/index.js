const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user.js")(sequelize, Sequelize);
db.Post = require("./post.js")(sequelize, Sequelize);
db.Qna = require("./qna.js")(sequelize, Sequelize);
db.Recommend = require("./recommend.js")(sequelize, Sequelize);

//qna DB 연결
db.qna = require("./qna.js")(sequelize, Sequelize);

module.exports = db;
