
module.exports = {

    currentDate : ()=>{
        let today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth()+1;
        if(String(month)[0]!=1 && String(month).length != 2){
            month = "0"+month;
        }
        let date = today.getDate();

        return year+"-"+month+"-"+date;
    },
    
};