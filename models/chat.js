module.exports = (sequelize, Sequelize) => {
    const User = require("./user")(sequelize, Sequelize);
    class Chat extends Sequelize.Model {
      static async findByPkAndUpdate(id, params) {
        try {
          let chat = await Chat.findByPk(id);
          if (chat) {
            chat = await Chat.update(params, {
              where: { id: id },
            });
          }
          return chat;
        } catch (err) {
          console.log(err);
        }
      }
      static async findByPkAndRemove(id) {
        try {
          let chat = await Chat.findByPk(id);
          if (chat) {
            chat = await Chat.destroy(params, {
              where: { id: id },
            });
          }
          return chat;
        } catch (err) {
          console.log(err);
        }
      }
    }
    Chat.init(
      {
        chat_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoincrement: true,
          primarykey: true,
        },
        receive_user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: User,
            key: "user_id",
          },
        },
        send_user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: User,
              key: "user_id",
            },
          },
        chat_content: {
          type: Sequelize.STRING,
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
        modelName: "Chat",
        tableName: "chat",
      }
    );
    return Chat;
  };
  