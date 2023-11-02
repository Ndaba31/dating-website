import { faComment } from '@fortawesome/free-regular-svg-icons';
import { UserExtended } from './interfaces/User';

interface QuestionProps {
	id: number;
	question: string | string[];
	options?: string[];
	type: string;
	inpName: string;
}

export const questions: QuestionProps[] = [
	{
		id: 1,
		question: 'What do the streets know you as?',
		type: 'text',
		inpName: 'nickName',
	},
	{
		id: 2,
		question: "What's the name of your closest city?",
		type: 'text',
		inpName: 'city',
	},
];

export const users: UserExtended[] = [
	{
		user: {
			firstName: 'Nosiphephelo',
			lastName: 'Ndabandaba',
			email: 'my@mail.com',
			password: '12345',
			stem: 'holy_baddie',
			dateJoined: new Date(),
			hickies: 16,
			pumpkins: 5978,
		},
		nickName: 'boo thang',
		profile_photo: { media: 'lesedi.jpeg', alt: `profile photo of holy_baddie` },
		dob: new Date(),
		id: 9808316100539,
		idImg: { media: 'lesedi.jpeg', alt: `ID photo of holy_baddie` },
		phone: 79835467,
		socials: [
			{
				icon: faComment,
				social: 'Instagram',
				link: 'https://www.instagram.com/unclewaffles_/?hl=en',
			},
		],
		bio: 'Waffles\nArtist\nInternational Dj\nRepresented by @kreative.kornerr\nEmail: bookings@kreativekornerr.com|\nNOT ON FACEBOOK',
		hobbies: ['dancing', 'singing', 'swimming'],
		occupation: [{ company: 'MTN', title: 'Sales Rep', salary_max: 30000, salary_min: 20000 }],
		ethnicity: 'coloured',
		sex: 'female',
		region: 'Manzini',
		city: 'Matsapha',
		relationship_status: 'In a relationship',
		religion: 'Christian',
		posts: [
			{
				media: 'linda.jpeg',
			},
			{
				media: 'linda.jpeg',
			},
			{
				media: 'linda.jpeg',
			},
			{
				media: 'linda.jpeg',
			},
		],
	},
	{
		user: {
			firstName: 'Ntokozo',
			lastName: 'Ndabandaba',
			email: 'fly@mail.com',
			password: '12345',
			stem: 'inja_yegame',
			dateJoined: new Date(),
			hickies: 10,
			pumpkins: 1324,
		},
		nickName: 'Inja Yegame',
		profile_photo: { media: 'lynette.jpeg', alt: `profile photo of inja_yegame` },
		dob: new Date(),
		id: 9808316100123,
		idImg: { media: 'lynette.jpeg', alt: `ID photo of inja_yegame` },
		phone: 76543902,
		socials: [
			{
				icon: faComment,
				social: 'Instagram',
				link: 'https://www.instagram.com/that_owe_fugazi/',
			},
		],
		bio: "Kingdom Financer\nGod's Poem\nFitness Freak\nAnd well of course... FIFA LEGEND",
		hobbies: ['coding', 'groove', 'hiking'],
		occupation: [
			{
				company: 'XYZ Incorporated',
				title: 'Managing Director',
				salary_max: 100000,
				salary_min: 85000,
			},
		],
		ethnicity: 'black',
		sex: 'male',
		region: 'Manzini',
		city: 'Fairview',
		relationship_status: "It's complicated",
		religion: 'Christian',
		posts: [
			{
				media: 'lisa.jpeg',
			},
			{
				media: 'lisa.jpeg',
			},
			{
				media: 'lisa.jpeg',
			},
			{
				media: 'lisa.jpeg',
			},
		],
	},
];
