const bcrypt = require('bcrypt');
const saltrounds = 10;


module.exports = function({}){
	return {
		encryptPassword: function(password, callback) {
            bcrypt.hash(password, saltrounds, function(error, hash){
                if(error) {
                    callback(error, null)
                }else{
                    callback(null, hash)
                }
            })
		},
        validateEncryptedPassword: function(password, storedpassword, callback) {
            bcrypt.compare(password, storedpassword, function(error, result) {
                if (error) {
                    callback(['Wrong password'], null)
                } else {
                    callback(null, result)
                }
            });
        }
	}
}