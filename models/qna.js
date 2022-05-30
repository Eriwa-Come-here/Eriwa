module.exports = (sequelize, Sequelize) => {
    const User = require("./user")(sequelize, Sequelize);
    class Qna extends Sequelize.Model{
        static async findByPkAndUpdate(id, params) {
            try{
                let qna = await Qna.findByPk(id);
                if(qna){
                    qna = await Qna.update(params, {
                        where: {id: id}
                    });
                }
                return qna;
            }catch(err){
                console.log(err);
            }
        }
        static async findByPkAndRemove(id){
            try{
                let qna = await Qna.findByPk(id);
                if(qna){
                    qna = await Qna.destroy(params, {
                        where: {id: id}
                    });
                }
                return qna;
            }catch(err){
                console.log(err);
            }
        }
    }
    Qna.init({
        user_id:{
            type: Sequelize.STRING, 
            allowNull: false, 
            references: {
                model: User,
                key: 'user_id'
            }
            
        },
        qna_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoincrement:true, 
            primarykey: true
        },
        question:{
            type: Sequelize.TEXT, 
            allowNull: false

        },
        answer:{
            type: Sequelize.TEXT

        }
    }, {
        sequelize,
        modelName: 'qna'
    });
    return Qna;
}