import { models, model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
	name: {
		required: true,
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	dateJoined: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;
