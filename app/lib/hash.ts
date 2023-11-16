const bcrypt = require('bcrypt');

const saltRounds = 10;

export default function hashPass(unHashedPass: string) {
	return bcrypt.hash(unHashedPass, saltRounds).then(function (hash: string) {
		return hash;
	});
}
