import { query } from '@/lib/db';

export default async function handler(req, res) {
    let message;
    if (req.method === 'POST') {
    const { user } = req.body;

        let allUsers = []

        //Person Who Slide In Your DM'S
        const slideForYou = await query({
            query: 'SELECT user_details.*,slide,liked_back FROM matches, user_details WHERE matches.crushee = user_details.stem and crush = ?;',
            values:[user]
        })
        //Person you liked back
        const youAcceptedMatch = await query({
            query: 'SELECT user_details.*,slide,liked_back FROM matches, user_details WHERE matches.crushee = user_details.stem and crush = ? and liked_back = ?;',
            values:[user,1]
        })
        // Person you rejected
        const youRejectedMatch =await query({
            query: 'SELECT user_details.*,slide,liked_back FROM matches, user_details WHERE matches.crushee = user_details.stem and crush = ? and liked_back = ?;',
            values:[user,0]
        })

       // 		People you slid into
       const slideForCrush = await query({
        query: 'SELECT user_details.*,slide,liked_back FROM matches, user_details WHERE matches.crush = user_details.stem and crushee = ?;',
        values:[user]
    })
        // People who liked you back
        const crushAccepted =await query({
            query: 'SELECT user_details.*,slide,liked_back FROM matches, user_details WHERE matches.crush = user_details.stem and crushee = ? and liked_back = ?;',
            values:[user,1]
        })
         // People who rejected you
         const crushRejected =await query({
            query: 'SELECT user_details.*,slide,liked_back FROM matches, user_details WHERE matches.crush = user_details.stem and crushee = ? and liked_back = ?;',
            values:[user,0]
         })

          const allOccupations = await query({
		 	query: 'SELECT * FROM occupations',
		 	values: [],
		 });

		 const allSocials = await query({
		 	query: 'SELECT * FROM socials',
		 	values: [],
		 });

         allUsers = slideForYou.concat(youAcceptedMatch,youRejectedMatch,slideForCrush,crushAccepted,crushRejected)

        console.log(allUsers);
         if (allUsers.length!==0) {
            message  = allUsers.length + ' users found';
        } else {
            message = 'No users found';
        }

        res.status(200).json({
			message: message,
			users: allUsers,
			occupations: allOccupations,
			socials: allSocials,
            slideForYou:slideForYou,
            youAcceptedMatch:youAcceptedMatch,
            youRejectedMatch:youRejectedMatch,
            slideForCrush:slideForCrush ,
            crushAccepted:crushAccepted,
            crushRejected:crushRejected,
		});

    }

}