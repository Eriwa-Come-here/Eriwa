const passportLocalSequelize = require("passport-local-sequelize");

module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let user = await User.findByPk(id);
        //let oldPassword = user.password;
        if (user) {
          user = await User.update(params, {
            where: { user_id: id },
          });
          /*
        if(params.password != null){          
          user = await User.changePassword(oldPassword, params.password);
          console.log(user);
        }        */
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
            where: { user_id: id },
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
  
  //User.removeAttribute("id");

  return User;
};
