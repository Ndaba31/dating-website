import Header from '@/components/Head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Image from 'next/legacy/image';
import Posts from '@/components/Posts';
import { useDateContext } from '@/context/dateContext';
import { Favorite, FavoriteBorder,PeopleAlt } from '@mui/icons-material';
import Hickies from '@/components/Hickies';
import Navbar from '@/components/Navbar';

const Page = () => {
	const router = useRouter();
	const id = router.query.stem;

	//const [allMatches, setAllMatches] = useState([]);

	const {user, isAuth, setError, error } = useDateContext();
	const currentUser = user
	const event ={
		initial:0,
		action:1,
		reaction:2,
		bonus:3,
		accept:4,
		reject:5

	}
	//let initSlide = false
	
	// try{
	 
	//  if (temp.slide){
    //     initSlide=true
	//  }
	// }catch(e){}

	// const pumpkin = allUsers.find(({ stem }) => stem === id);

	//console.log(id);

	const [favorite, setFavorite] = useState(event.initial);
	const [slide, setSlide] = useState(event.initial);
	// const [hickies, setHickies] = useState([]);
	const [crushBack,setCrushBack] = useState(false)
	const [confirm,setConfirm]= useState(event.initial)
	const [liked_back, setLiked_back] = useState()
	const [matchesExist, setMatchesExist] = useState(true)
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);
	const [occupations, setOccupations] = useState([]);
	const [location, setLocation] = useState({});
	const [pumpkin, setPumpkin] = useState({});
	//const [allMatches,setAllMatches] =useState({})

	const maxChar = 150;
	const [showAll, setShowAll] = useState(false);

	// console.log(temp);
	// setFavorite();

	const toggleReadMore = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		const getPumpkin = async () => {
			const getData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					crushee: currentUser.stem
				})
			};

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumkins/${id}`, getData);
			const { user,occupations, hobbies, posts, location, message,likes,matches,slide,crushExist,liked_back } = await res.json();

			setPumpkin(user);
			setOccupations(occupations);
			setHobbies(hobbies);
			setPosts(posts);
			setLocation(location);
			setLiked_back(Number(liked_back));
			setMatchesExist(matches);
			setCrushBack(crushExist)
			
			console.log(liked_back)
			
		

           
				setSlide(slide?event.action:event.initial)
			
			

			 if (likes){
			 	setFavorite(event.action)
			 }
			 if(liked_back){
				if(liked_back===1){
				setSlide(event.accept)
			 }
			 if(liked_back===0){
				setSlide(event.reject)
			 }
			 }
			 if(crushExist){
				setSlide(event.bonus)
				//setConfirm(event.bonus)
			 }
			 
			//  if(!isNull){
			// 	hideEnableChangeMind('flex')
			// 	hideEnableChoice('none')
			//  }else/* if(!isNull)*/{
			// 	hideEnableChangeMind('none')
				
			//  }
             
			//  console.log(isNull)

			if (message === 'User Not Found') {
				setError(message);
			}
		}
		getPumpkin();
	},[]);

	useEffect(() => {
		const toggleLike = async () => {
			let like_count = pumpkin.pumpkins === 0 ? 0 : pumpkin.pumpkins;

			const updateData = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					like: favorite == event.action ? 1 : 0,
					update: 'like',
					crushee: user.stem,
					crush: id,
					like_count: favorite==event.action ? ++like_count : like_count === 0 ? 0 : --like_count,
				}),
			};

			const removeData = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					like: favorite == event.action ? 1 : 0,
					update: 'dislike',
					crushee: user.stem,
					crush: id,
					like_count: favorite==event.action ? ++like_count : like_count === 0 ? 0 : --like_count,
				}),
			};

			if(favorite==event.action){
				const likeUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, updateData);
				const { message } = await likeUser.json();
			}else if(favorite==event.reaction){
				const removeLike = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,removeData);
			}

			// if (message === 'Liked profile!') setFavorite(!favorite);
		};

		toggleLike();
	}, [favorite]);

	
    useEffect(() => {
		const slideApproach = async () =>{
         
			const slideData = {
				method: 'PUT',
				headers:{
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update:'slide',
					crushee: user.stem,
					crush: id
				}),
			}

			const cancelSlide = {
				method: 'PUT',
				headers:{
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update:'slideout',
					crushee: user.stem,
					crush: id
				}),
			}

			const decline = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update:'slideout',
					crushee: id,
					crush: user.stem
				}),
			}

			if(slide==event.action){
				const slide_onUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,slideData)
				const {message} = await slide_onUser.json()
				
				if (message==='slideInitiated'){
					//setSlide(event.initial)
					
				}
			  }else if(slide===event.reaction){
				const slideCancel = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,cancelSlide)
			  }//else if(slide===event.reject){
				//const declineSlide =await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,decline)
				//setSlide(event.bonus)
			 // }

			
		};

		
	
	  slideApproach();
	}, [slide])

	useEffect(() => {
	  const confirmMatches= async() =>{
		let totalMatches = pumpkin.hickies === 0 ? 0 : pumpkin.hickies

        const confirmMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update:'confirmMatch',
				crushee: id,
				crush: user.stem,
				totalMatches:confirm===event.accept?++totalMatches:totalMatches===0?0:--totalMatches 
			}),
		}

		const denyMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update:'denyMatch',
				crushee: id,
				crush: user.stem
			}),
		}

		const nullify = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update:'nullify',
				crushee: id,
				crush: user.stem,
				totalMatches: confirm===event.accept?++totalMatches:totalMatches===0?0:--totalMatches
			}),
		}

		if(confirm===event.accept){
			
			const acceptMatch =await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,confirmMatch)
		}
		if(confirm===event.reject){
			
			const declineMatch= await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,denyMatch)
		}
		if(confirm===event.bonus){
			
			const negate = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,nullify)
		}
	  };
	
	  confirmMatches();
	}, [confirm])
	


	//console.log(pumpkin);
	let age;

	if (pumpkin === undefined || pumpkin.dob === undefined || pumpkin.dob === null) {
		age = '';
	} else {
		age = new Date().getFullYear() - new Date(pumpkin.dob).getFullYear();
	}

	// function hideEnableSlide(displayValue){
	// 	var div = document.getElementById('slide');
	// 	div.style.display = displayValue
		

	// }

	// function hideEnableChoice(displayValue){
	// 	var div = document.getElementById('choice');
	// 	div.style.display = displayValue
		 

	// }

	// function hideEnableChangeMind(displayValue){
	// 	var div = document.getElementById('changeMind');
	// 	div.style.display = displayValue
	// }

	return (
		<>
			<Header title={id} />
			<Navbar page='profile' />
			<div className={styles.container}>
				<div className={styles.left}>
					<Image
						src={
							pumpkin === undefined ||
							pumpkin.profile_photo === undefined ||
							pumpkin.profile_photo === null
								? '/no_photo.png'
								: '/' + pumpkin.profile_photo
						}
						alt={`/${
							pumpkin === undefined ||
							pumpkin.profile_photo === undefined ||
							pumpkin.profile_photo === null
								? 'No Photo'
								: pumpkin.profile_photo
						}`}
						width={500}
						height={500}
						layout='responsive'
						// objectFit='cover'
						priority
						// style={{ width: '100%', height: '100%' }}
					/>
				</div>

				{pumpkin !== undefined && (
					<article className={styles.right}>
						<section className={styles.followers}>
							<p>{pumpkin.pumpkins} Pumpkins</p>
							<p>{pumpkin.hickies} Hickies</p>
						</section>
						<section className={styles.top_section}>
							{pumpkin.nick_name !== null && (
								<h1 style={{ fontSize: '24pt', lineHeight: '24px' }}>
									{pumpkin.nick_name}
								</h1>
							)}
							<p className={styles.heading}>
								{pumpkin.first_name + ' ' + pumpkin.last_name + ', ' + age}
							</p>
							{occupations.length !== 0 &&
								occupations.map(({ title, company }, i) => (
									<p key={i} style={{ fontSize: '14pt' }}>
										{title} at {company}
									</p>
								))}
							{pumpkin.sex &&
								pumpkin.sex !== 'X' &&
								(pumpkin.sex === 'M' ? (
									<p className={styles.sex}>Male</p>
								) : (
									<p className={styles.sex}>Female</p>
								))}
							<div className={styles.info_container}>
								{location !== undefined && location.city && (
									<div className={styles.info}>
										<p>Closest City:</p>
										<p>{location.city}</p>
									</div>
								)}
								{location !== undefined && location.region && (
									<div className={styles.info}>
										<p>Region:</p>
										<p>{location.region}</p>
									</div>
								)}
								{pumpkin.ethnicity && (
									<div className={styles.info}>
										<p>Ethnicity:</p>
										<p>{pumpkin.ethnicity}</p>
									</div>
								)}
								{pumpkin.relationship_status && (
									<div className={styles.info}>
										<p>Relationship Status:</p>
										<p>{pumpkin.relationship_status}</p>
									</div>
								)}
								{pumpkin.religion && (
									<div className={styles.info}>
										<p>Religion:</p>
										<p>{pumpkin.religion}</p>
									</div>
								)}
							</div>
							{pumpkin.bio && (
								<div className={styles.section}>
									<h2>About</h2>
									<p style={{ fontSize: '16pt' }}>
										{showAll ? pumpkin.bio : pumpkin.bio.slice(0, maxChar)}
									</p>
									{pumpkin.bio.length > maxChar && (
										<button onClick={toggleReadMore} className={styles.read}>
											{showAll ? 'Read Less' : 'Read More'}
										</button>
									)}
								</div>
							)}
							{hobbies.length !== 0 && (
								<div>
									<h2>Hobbies</h2>
									<div className={styles.hobbies}>
										{hobbies.map(({ hobby }, i) => (
											<button key={i} className={styles.hobby} disabled>
												{hobby}
											</button>
										))}
									</div>
								</div>
							)}
							{isAuth && (
								<div style={{ display: 'flex', justifyContent: 'space-around' }}>
									<button 
										onClick={()=>{if(favorite==event.initial||favorite==event.reaction){
											setFavorite(event.action)
										}
										else{
										  setFavorite(event.reaction)
										}}}
										style={{ backgroundColor: 'transparent', border: 0 }}
									>
										{favorite==event.action ? (
											<Favorite className={styles.favorite} />
										) : (
											<FavoriteBorder className={styles.favorite} />
										)}
									</button>
								
									{
										(slide===event.initial||slide===event.reaction||slide===event.action)&&(
											<button id='slide' onClick={()=>{if(!matchesExist){
												setSlide(event.action)
												setMatchesExist(true)
											}
											else if(slide===event.action){
											  setSlide(event.reaction)
											  setMatchesExist(false)
											}}}
											 className={(!matchesExist)?styles.match_button:styles.match_button_clicked}>
											 {(!matchesExist) ? 
												<p style={{ fontSize: '12pt' }}>Slide</p>:<p 
												style={{ fontSize: '12pt' }}>Gwababa</p>} 
												<PeopleAlt />
											</button>
										)
										
									}
								{
									(slide===event.bonus&&crushBack&&liked_back===null)&&(
										<div id='choice'><p style={{fontSize: '12pt'}}><b>This Person has already initiated to match with you </b></p>
								       <div className={styles.choice_buttons}>
									   <button onClick={()=>{
									   setConfirm(event.accept)
									   setSlide(event.accept)
									   //hideEnableChangeMind('flex')
									   //hideEnableChoice('none')
									   
									   }
									}
									    className={styles.match_button_accept}><p style={{fontSize: '12pt'}}>Accept</p></button>
									    <button onClick={()=>{
											setConfirm(event.reject)
											setSlide(event.reject)
										 //   hideEnableChoice('none')
										//	hideEnableChangeMind('flex')
											
										}}
									    className={styles.match_button_decline}><p style={{fontSize: '12pt'}}>Decline</p></button>
									   </div>
									   
								</div>
									)
								}
									
									{
										(liked_back===1||liked_back===0) && (
											<button id='changeMind' onClick={()=>{
												setConfirm(event.bonus)
												setSlide(event.bonus)
											}} className={styles.change_mind} ><p style={{fontSize: '12pt'}}>Change Mind</p></button>
										)
									}

									{
										(matchesExist&&liked_back===1)&&(
											<button id='changeMind' onClick={()=>{
												setSlide(event.action)
											}} className={styles.change_mind} ><p style={{fontSize: '12pt'}}>Change Mind</p></button>
										)
									}
									
								</div>
							)}
						</section>
					</article>
				)}
			</div>
			{/* <Hickies hickies={hickies} /> */}
			{/* {console.log(hickies)} */}
			<div style={{ padding: '16px', display: 'grid' }}>
				{posts.length !== 0 ? (
					<>
						<h1
							style={{
								fontWeight: 'bold',
								textAlign: 'center',
								marginBottom: '32px',
							}}
						>
							Gallery
						</h1>
						<Posts posts={posts} />
					</>
				) : (
					<h1 style={{ textAlign: 'center' }}>No Posts Yet</h1>
				)}
			</div>
		</>
	);
};

export default Page;
