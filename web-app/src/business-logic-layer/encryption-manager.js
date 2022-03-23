const bcrypt = require('bcrypt');
const saltrounds = 10;


module.exports = function({}){
	return {
		encryptPassword: function(password, callback) {
            bcrypt.hash(password, saltrounds, function(error, hash){
                if(error) {
                    //TODO something
                }else{
                    callback(hash)
                }
            })
		},
        validateEncryptedPassword: function(password, storedpassword, callback) {
            bcrypt.compare(password, storedpassword, function(error, result) {
                if (error) {
                    //TODO something
                } else {
                    callback(result)
                }
            });
        }
	}
}