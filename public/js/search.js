const search = require("../js/currentDate.js");
module.exports = {

    sliceDate : (input)=>{
        let today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth();
        let date = today.getDate();

        if(parseInt(month)-input<=0){
            month = (parseInt(month)-input+12+1);
            year = parseInt(year) - 1;
        }
        else
            month = (parseInt(month)-input+1);

        if(String(month)[0]!=1 && String(month).length != 2){
            month = "0"+month;
        }

        return year+"-"+month+"-"+date;
    },


    getDate: (input) => {
        let value = new Date(input - (540 * 60 * 1000));
        let month = ('0' + (value.getMonth() + 1)).slice(-2);
        let date = ('0' + value.getDate()).slice(-2);
        return value.getFullYear() + "." + month + "." + date;
    },
    
    
};