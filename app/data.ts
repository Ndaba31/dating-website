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
