//models/comment.js
module.exports = (sequelize, Sequelize) => {
  const user = require("./user")(sequelize, Sequelize);
  const post = require("./post")(sequelize, Sequelize);
  class comment extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let comment = await comment.findByPk(id);
        if (comment) {
          comment = await comment.update(params, {
            where: { id: id },
          });
        }
        return comment;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let comment = await comment.findByPk(id);
        if (comment) {
          comment = await comment.destroy(params, {
            where: { id: id },
          });
        }
        return comment;
      } catch (err) {
        console.log(err);
      }
    }
  }
  comment.init(
    {
      post_id: {
        // 외래키
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: post,
          key: "post_id",
        },
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        // 외래키
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "deleted",
        references: {
          model: user,
          key: "user_id",
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      written_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "comment",
      tableName: "comment",
    }
  );
  return comment;
};
