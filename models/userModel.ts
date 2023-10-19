import { models, model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	dateJoined: Date;
	role: 'user' | 'admin';
}

interface Methods {
	comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<UserDocument, {}, Methods>({
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
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		throw error;
	}
});

UserSchema.methods.comparePassword = async function (password: string) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};

const UserModel = models.User || model('User', UserSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
