// public/js/datefunc.js

module.exports = {
    getDate: (value) => {
        var month = value.getMonth() < 10 ? "0" + value.getMonth() : value.getMonth();
        var date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
        var hour = value.getHours() < 10 ? "0" + value.getHours() : value.getHours();
        var minute = value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
        return value.getFullYear() + "." + month + "." + date + ". " + hour + ":" + minute;
    },
    
};