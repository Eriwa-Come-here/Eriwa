module.exports = (sequelize, Sequelize) => {
  const User = require("./user")(sequelize, Sequelize);
  const Post = require("./post")(sequelize, Sequelize);
  class Recommend extends Sequelize.Model {}
  Recommend.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: User,
          key: "user_id",
        },
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Post,
          key: "post_id",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Recommend",
      tableName: "recommend",
    }
  );

  Recommend.removeAttribute("id");

  return Recommend;
};
