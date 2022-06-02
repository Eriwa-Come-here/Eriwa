//models/comment.js
module.exports = (sequelize, Sequelize) => {
    const User = require("./user")(sequelize, Sequelize);
    const Post = require("./post")(sequelize, Sequelize);
    class Comment extends Sequelize.Model{
        static async findByPkAndUpdate(id, params) {
            try{
                let comment = await Comment.findByPk(id);
                if(comment){
                    comment = await Comment.update(params, {
                        where: {id: id}
                    });
                }
                return comment;
            }catch(err){
                console.log(err);
            }
        }
        static async findByPkAndRemove(id){
            try{
                let comment = await Comment.findByPk(id);
                if(comment){
                    comment = await Comment.destroy(params, {
                        where: {id: id}
                    });
                }
                return comment;
            }catch(err){
                console.log(err);
            }
        }
    }
    Comment.init({
        post_id: { // 외래키
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Post,
                key: 'post_id'
            }
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: { // 외래키
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "deleted",
            references: {
                model: User,
                key: 'user_id'
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        written_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'comment'
    });
    return Comment;
}