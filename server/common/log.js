let colors = require('colors');
module.exports = {
    Log: async (type, message) => {
        switch(type) {
            case 'ERROR': {
                console.log(`${message}`.red);
            }
            break;
            case 'SUCCESS': {
                console.log(`${message}`.green.underline);
            }
            break;
            default:
                console.log('ERROR TYPE NOT VALID');
        }
    }
}