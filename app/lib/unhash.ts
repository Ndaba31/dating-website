const bcrypt = require('bcrypt');

export default function isSamePass(unHashedPass: string, hashedPass: string) {
	return bcrypt.compare(unHashedPass, hashedPass).then(function (result: boolean) {
		return result;
	});
}
