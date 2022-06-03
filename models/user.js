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
          user = await User.destroy(params, {
            where: { id: id },
          });
        }

        return user;
      } catch (err) {
        console.log(err);
      }
    }
  }
  User.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
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
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
      tableName: "user",
    }
  );
  User.removeAttribute("id");

  return User;
};
