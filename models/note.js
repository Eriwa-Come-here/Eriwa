module.exports = (sequelize, Sequelize) => {
    const User = require("./user")(sequelize, Sequelize);
    class Note extends Sequelize.Model {
      static async findByPkAndUpdate(id, params) {
        try {
          let note = await Note.findByPk(id);
          if (note) {
            note = await Note.update(params, {
              where: { id: id },
            });
          }
          return note;
        } catch (err) {
          console.log(err);
        }
      }
      static async findByPkAndRemove(id) {
        try {
          let note = await Note.findByPk(id);
          if (note) {
            note = await Note.destroy(params, {
              where: { id: id },
            });
          }
          return note;
        } catch (err) {
          console.log(err);
        }
      }
    }
    Note.init(
      {
        note_id: {
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
        note_content: {
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
        modelName: "Note",
        tableName: "note",
      }
    );
    return Note;
  };
  