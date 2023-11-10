import User, { UserExtended } from './User';

export default interface Match {
	user: UserExtended;
	when: Date;
	pumpkin: UserExtended;
	likes: boolean;
	accepted?: boolean;
	answered_when?: Date;
}
