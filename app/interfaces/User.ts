import Location from './Location';
import Occupation from './Occupation';
import Post from './Posts';
import Socials from './Socials';

export default interface User {
	firstName: string;
	lastName: string;
	email: string;
	stem: string;
	password: string;
	dateJoined: Date;
	hickies: number;
	pumpkins: number;
}

export interface UserExtended {
	user: User;
	nickName?: string;
	profile_photo?: Post;
	dob?: Date;
	id?: number;
	idImg?: Post;
	phone?: number;
	socials?: Socials[];
	bio?: string;
	posts?: Post[];
	hobbies?: string[];
	occupation?: Occupation[];
	ethnicity?: string;
	sex?: string;
	region?: string;
	city?: string;
	location?: Location;
	relationship_status?: string;
	religion?: string;
}
