module.exports = (sequelize, Sequelize) => {
  const user = require("./user")(sequelize, Sequelize);
  const post = require("./post")(sequelize, Sequelize);
  class recommend extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let recommend = await recommend.findByPk(id);
        if (recommend) {
          recommend = await recommend.update(params, {
            where: { id: id },
          });
        }
        return recommend;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let recommend = await recommend.findByPk(id);
        if (recommend) {
          recommend = await recommend.destroy(params, {
            where: { id: id },
          });
        }
        return recommend;
      } catch (err) {
        console.log(err);
      }
    }
  }
  recommend.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: user,
          key: "user_id",
        },
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: post,
          key: "post_id",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "recommend",
      tableName: "recommend",
    }
  );

  recommend.removeAttribute('id');

  return recommend;
};
