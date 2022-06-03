module.exports = (sequelize, Sequelize) => {
  const User = require("./user")(sequelize, Sequelize);
  class Post extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let post = await Post.findByPk(id);
        if (post) {
          post = await Post.update(params, {
            where: { id: id },
          });
        }
        return post;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let post = await Post.findByPk(id);
        if (post) {
          post = await Post.destroy(params, {
            where: { id: id },
          });
        }
        return post;
      } catch (err) {
        console.log(err);
      }
    }
  }

  Post.init(
    {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoincrement: true,
        primarykey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address3: {
        type: Sequelize.STRING,
      },
      place_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      place_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      grade: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      written_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: user,
          key: "user_id",
        },
      },
      can_park: {
        type: Sequelize.BOOLEAN,
      },
      can_pet: {
        type: Sequelize.BOOLEAN,
      },
      view_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Post",
      tableName: "post",
    }
  );
  return Post;
};
