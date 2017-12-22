const crypto = require('crypto');

module.exports = {
	MD5_SUFFIX:'gsgsdhhjr&&*^%%$*%^jshdhkljhjd%%^HFFghdlkh',
	md5:function(str){
		const hash = crypto.createHash('md5');
		hash.update(str);
		return hash.digest('hex');
	}
};