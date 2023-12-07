import { Facebook, Instagram, Twitter, WhatsApp } from '@mui/icons-material';

export const questions = [
	{
		id: 1,
		question: 'What do the streets know you as?',
		type: 'nickname',
		inpName: 'nickName',
	},
	{
		id: 2,
		question: 'When did you fall from heaven angel? (date of birth)',
		type: 'age',
		inpName: 'age',
	},
	{
		id: 3,
		question: 'Tell us how you secure the bag.',
		type: 'occupation',
		inpName: 'occupation',
	},
	{
		id: 4,
		question: "What's the name of your closest city?",
		type: 'city',
		inpName: 'city',
	},
	{
		id: 5,
		question: 'Your streets are in which region of the kingdom?',
		type: 'region',
		inpName: 'region',
	},
	{
		id: 6,
		question: 'Tell us more about yourself',
		type: 'bio',
		inpName: 'bio',
	},
	{
		id: 7,
		question: 'What are your hobbies?',
		type: 'hobby',
		inpName: 'hobby',
	},
	{
		id: 8,
		question: "How's about your digits? (Phone number)",
		type: 'phone',
		inpName: 'phone',
	},
	{
		id: 9,
		question: 'Let me know your sex',
		type: 'sex',
		inpName: 'sex',
	},
	{
		id: 10,
		question: "I don't see colour, but what's your ethnicity",
		type: 'ethnicity',
		inpName: 'ethnicity',
	},
	{
		id: 11,
		question: "Let's see how mujolo is treating you, what's your relationship status?",
		type: 'relationship',
		inpName: 'relationship',
	},
	{
		id: 12,
		question: 'What spirituality do you subscribe to?',
		type: 'religion',
		inpName: 'religion',
	},
];

export const sexes = [
	{
		gender: 'Male',
		value: 'M',
	},
	{
		gender: 'Female',
		value: 'F',
	},
	{
		gender: "I'll rather not say",
		value: 'X',
	},
];

export let social_media = [
	{
		icon: <WhatsApp />,
		social: 'WhatsApp',
		link: '',
	},
	{
		icon: <Facebook />,
		social: 'Facebook',
		link: '',
	},
	{
		icon: <Instagram />,
		social: 'Instagram',
		link: '',
	},
	{
		icon: <Twitter />,
		social: 'Twitter',
		link: '',
	},
];

export const regions = ['Manzini', 'Hhohho', 'Lobamba', 'Shiselweni'];

export const relationship_status = [
	'Married',
	'Single',
	'Divorced',
	'Widowed',
	"It's Complicated",
	'Dating Exclusively',
];

export const ethinicities = [
	'Asian',
	'Black',
	'White',
	'Arab',
	'Indian',
	'Pakistani',
	'Nigerian',
	'Coloured',
	'Other',
];

export const religions = [
	'Christianity',
	'Islam Faith',
	'Ancestors',
	'Bahai Faith',
	'Not Sure',
	'Nothing Really',
];
