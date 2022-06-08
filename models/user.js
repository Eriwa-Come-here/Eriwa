const passportLocalSequelize = require("passport-local-sequelize");

module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let user = await User.findByPk(id);
        if (user) {
          user = await User.update(params, {
            where: { id: id },
          });
        }
        return user;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let user = await User.findByPk(id);
        if (user) {
          user = await User.destroy({
            where: { id: id },
          });
        }
        return user;

      } catch (err) {
        console.log(err);
      }
    }
  };

  User.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      mysalt: {
        type: Sequelize.STRING
      }
    },

    {
      sequelize,
      timestamps: false,
      modelName: "User",
      tableName: "user",
    });

  passportLocalSequelize.attachToUser(User, {
    usernameField: "user_id",
    hashField: "password",
    saltField: "mysalt"
  });
  

  return User;
};
