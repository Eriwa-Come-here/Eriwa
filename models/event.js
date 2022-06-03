module.exports = (sequelize, Sequelize) => {
    const user = require("./user")(sequelize, Sequelize);
    class event extends Sequelize.Model {
      static async findByPkAndUpdate(id, params) {
        try {
          let event = await event.findByPk(id);
          if (event) {
            event = await event.update(params, {
              where: { id: id },
            });
          }
          return event;
        } catch (err) {
          console.log(err);
        }
      }
      static async findByPkAndRemove(id) {
        try {
          let event = await event.findByPk(id);
          if (event) {
            event = await event.destroy(params, {
              where: { id: id },
            });
          }
          return event;
        } catch (err) {
          console.log(err);
        }
      }
    }
    event.init(
      {
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: user,
              key: "user_id",
            },
          },
        event_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoincrement: true,
            primarykey: true,
        },
        event_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        event_content: {
            // 여기에,,,댓글작성자랑 게시글 제목이랑,,,댓글내용,,,,
            // +쪽지 작성자랑 쪽지 내용,,,
            type: Sequelize.STRING,
            allowNull: false,
        },
        url_address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_checked: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        event_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
  
      },
      {
        sequelize,
        timestamps: false,
        modelName: "event",
        tableName: "event",
      }
    );
    return event;
  };
  