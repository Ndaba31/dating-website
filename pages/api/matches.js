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

        //console.log(allUsers);
        console.log(second);
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
    if(req.method==='PUT'){
        const {searchString,update}=req.body;

        if(update==='getDiscover'){
           
            const wildcardPattern = searchString+'%';
            
             if (searchString.length===''){
                const discoverAllUsers = await query({
                    query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
                    values:[20]
                  });
                 
                  console.log(discoverAllUsers);
                  res.status(200).json({
                    discoverAllUsers:discoverAllUsers
                 }) 
             }else{
             const discoverAllUsers = await query({
              query: 'Select user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem WHERE users.first_name LIKE ? OR users.last_name LIKE ? OR user_details.stem LIKE ? OR user_details.nick_name LIKE ? LIMIT ?',
              values:[wildcardPattern,wildcardPattern,wildcardPattern,wildcardPattern,20]
              
            });
          
   
            res.status(200).json({
               discoverAllUsers:discoverAllUsers
            })
           }
        }
        if(update==='age'){
           
            const yearPattern = '%'+'Y';
            
             if (searchString.length===''){
                const discoverAllUsers = await query({
                    query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
                    values:[20]
                  });
                 
                  console.log(discoverAllUsers);
                  res.status(200).json({
                    discoverAllUsers:discoverAllUsers
                 }) 
             }else{
             const discoverAllUsers = await query({
              query: 'Select user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem WHERE (DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), ?) + ?) >= ? LIMIT ?',
              values:[yearPattern,0,Number(searchString),20]
              
            });
          
   
            res.status(200).json({
               discoverAllUsers:discoverAllUsers
            })
           }
        }
        if(update==='city'){

            const wildcardPattern = searchString+'%';

             if (searchString.length===''){
                const discoverAllUsers = await query({
                    query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
                    values:[20]
                  });
                 
                  console.log(discoverAllUsers);
                  res.status(200).json({
                    discoverAllUsers:discoverAllUsers
                 }) 
             }else{
             const discoverAllUsers = await query({
              query: 'Select user_details.*,locations.* FROM user_details LEFT JOIN locations ON locations.stem=user_details.stem WHERE city LIKE ? LIMIT ?',
              values:[wildcardPattern,20]
              
            });
          
   
            res.status(200).json({
               discoverAllUsers:discoverAllUsers
            })
           }
        }
        if(update==='region'){

            const wildcardPattern = searchString+'%';

             if (searchString.length===''){
                const discoverAllUsers = await query({
                    query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
                    values:[20]
                  });
                 
                  console.log(discoverAllUsers);
                  res.status(200).json({
                    discoverAllUsers:discoverAllUsers
                 }) 
             }else{
             const discoverAllUsers = await query({
              query: 'Select user_details.*,locations.* FROM user_details LEFT JOIN locations ON locations.stem=user_details.stem WHERE region LIKE ? LIMIT ?',
              values:[wildcardPattern,20]
              
            });
          
   
            res.status(200).json({
               discoverAllUsers:discoverAllUsers
            })
           }
        }
        if(update==='hobbies'){
            
            const wildcardPattern = searchString+'%';

            if (searchString.length===''){
               const discoverAllUsers = await query({
                   query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
                   values:[20]
                 });
                
                 console.log(discoverAllUsers);
                 res.status(200).json({
                   discoverAllUsers:discoverAllUsers
                }) 
            }else{
            const discoverAllUsers = await query({
             query: 'Select user_details.*,hobbies.* FROM user_details LEFT JOIN hobbies ON hobbies.stem=user_details.stem WHERE hobby LIKE ? LIMIT ?',
             values:[wildcardPattern,20]
             
           });
         
  
           res.status(200).json({
              discoverAllUsers:discoverAllUsers
           })
          }
       }
       if(update==='relationship'){
            
        const wildcardPattern = '%'+searchString+'%';

        if (searchString.length===''){
           const discoverAllUsers = await query({
               query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
               values:[20]
             });
            
             console.log(discoverAllUsers);
             res.status(200).json({
               discoverAllUsers:discoverAllUsers
            }) 
        }else{
        const discoverAllUsers = await query({
         query: 'Select user_details.* FROM user_details WHERE relationship_status LIKE ? LIMIT ?',
         values:[wildcardPattern,20]
         
       });
     

       res.status(200).json({
          discoverAllUsers:discoverAllUsers
       })
      }
   }
   if(update==='ethnicity'){
            
    const wildcardPattern = searchString+'%';

    if (searchString.length===''){
       const discoverAllUsers = await query({
           query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
           values:[20]
         });
        
         console.log(discoverAllUsers);
         res.status(200).json({
           discoverAllUsers:discoverAllUsers
        }) 
    }else{
    const discoverAllUsers = await query({
     query: 'Select user_details.*FROM user_details WHERE ethnicity LIKE ? LIMIT ?',
     values:[wildcardPattern,20]
     
   });
 

   res.status(200).json({
      discoverAllUsers:discoverAllUsers
   })
  }
}
if(update==='religion'){
            
    const wildcardPattern = searchString+'%';

    if (searchString.length===''){
       const discoverAllUsers = await query({
           query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
           values:[20]
         });
        
         console.log(discoverAllUsers);
         res.status(200).json({
           discoverAllUsers:discoverAllUsers
        }) 
    }else{
    const discoverAllUsers = await query({
     query: 'Select user_details.* FROM user_details WHERE religion LIKE ? LIMIT ?',
     values:[wildcardPattern,20]
     
   });
 

   res.status(200).json({
      discoverAllUsers:discoverAllUsers
   })
  }
}
if(update==='job'){
            
    const wildcardPattern = searchString+'%';

    if (searchString.length===''){
       const discoverAllUsers = await query({
           query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
           values:[20]
         });
        
         console.log(discoverAllUsers);
         res.status(200).json({
           discoverAllUsers:discoverAllUsers
        }) 
    }else{
    const discoverAllUsers = await query({
     query: 'Select user_details.*,occupations.* FROM user_details LEFT JOIN occupations ON occupations.stem=user_details.stem WHERE title LIKE ? LIMIT ?',
     values:[wildcardPattern,20]
     
   });
 

   res.status(200).json({
      discoverAllUsers:discoverAllUsers
   })
  }
}
if(update==='company'){
            
    const wildcardPattern = searchString+'%';

    if (searchString.length===''){
       const discoverAllUsers = await query({
           query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
           values:[20]
         });
        
         console.log(discoverAllUsers);
         res.status(200).json({
           discoverAllUsers:discoverAllUsers
        }) 
    }else{
    const discoverAllUsers = await query({
     query: 'Select user_details.*,occupations.* FROM user_details LEFT JOIN occupations ON occupations.stem=user_details.stem WHERE company LIKE ? LIMIT ?',
     values:[wildcardPattern,20]
     
   });
 

   res.status(200).json({
      discoverAllUsers:discoverAllUsers
   })
  }
}
    }

}