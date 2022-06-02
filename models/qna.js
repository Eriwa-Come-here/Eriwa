module.exports = (sequelize, Sequelize) => {
  class qna extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let qna = await qna.findByPk(id);
        if (qna) {
          qna = await qna.update(params, {
            where: { id: id },
          });
        }
        return qna;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let qna = await qna.findByPk(id);
        if (qna) {
          qna = await qna.destroy(params, {
            where: { id: id },
          });
        }
        return qna;
      } catch (err) {
        console.log(err);
      }
    }
  }
  qna.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: user,
          key: "user_id",
        },
      },
      qna_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoincrement: true,
        primarykey: true,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      answer: {
        type: Sequelize.TEXT,
      },
    },
    {
      sequelize,
      modelName: "qna",
      tableName: "qna",
    }
  );
  return qna;
};
