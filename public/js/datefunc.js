// public/js/datefunc.js

module.exports = {
    getDate: (input) => {
        var value = new Date(input - (540 * 60 * 1000));
        var month = ('0' + (value.getMonth() + 1)).slice(-2);
        var date = ('0' + value.getDate()).slice(-2);
        var hour = ('0' + value.getHours()).slice(-2);
        var minute = ('0' + value.getMinutes()).slice(-2);
        var second = ('0' + value.getSeconds()).slice(-2); 
        return value.getFullYear() + "." + month + "." + date + ". " + hour + ":" + minute + ":" + second;
    },
    
};