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

db.user = require("./user.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);
db.qna = require("./qna.js")(sequelize, Sequelize);
db.recommend = require("./recommend.js")(sequelize, Sequelize);
db.comment = require("./comment.js")(sequelize, Sequelize);

//관계
/*
db.user.hasMany(db.post);
db.post.belongsTo(db.user);
db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

db.post.hasMany(db.comment);
db.comment.belongsTo(db.post);

db.user.belongsToMany(db.post, {through: "Recommend"});
db.post.belongsToMany(db.user, {through: "Recommend"});*/

module.exports = db;
