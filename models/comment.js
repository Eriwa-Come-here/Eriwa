//models/post.js
module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define(
    "comment",
    {
      post_id: {
        // 외래키
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        // 외래키
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "deleted",
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      written_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  comment.associate = function (models) {
    comment.belongsTo(user, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
    comment.belongsTo(models.comment, {
      foreignKey: "post_id",
      sourceKey: "post_id",
    });
  };
  return comment;
};
