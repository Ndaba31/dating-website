import Header from "@/components/Head";
import {useState,useEffect,useRef } from 'react';
import styles from '../../styles/Couple.module.css';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useDateContext } from '@/context/dateContext';


const coupleMatch = () => {
    const [matchee, setMatchee] = useState(false)
    const [editBio, setEditBio] = useState(false)
    const [open, setOpen] = useState(false)
    const {user,specificMatch} = useDateContext();
    const [bioValue, setBioValue] = useState(specificMatch.blog_post?specificMatch.blog_post:"")
    

   const checkUser = () => {
      if(user.stem===specificMatch.crushee||user.stem===specificMatch.crush){
        setMatchee(true)
        setOpen(true)
      }

   }

   const fetchBio=useRef()

   const captureBio = () =>{
    setBioValue(fetchBio.current.value)
   }

   const updateBio = async () => {

    const bioData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newbio: bioValue,
            crushee: specificMatch.crushee,
            crush:specificMatch.crush
        })
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/couple`, bioData);
    const { message } = await res.json();


   }

   useEffect(() => {
    checkUser()
   },[])


   
   

    return(
        <>
        <Header title='Matched Couple'/>
        <div className={styles.heading}>
						Welcome to the {specificMatch.crushee} and {specificMatch.crush}'s page 
		</div>
        <Image
						src={specificMatch.couple_photo===null?'/no_photo.png':`/${specificMatch.couple_photo}`}
						alt='Couple Photo'
						width={500}
						height={500}
						layout='responsive'
						priority
					/>{
                       (!editBio) &&(<div className={styles.bg}>
                        <h1 className={styles.headingText}>Read Our Biography</h1>
                        <h2 className={styles.readBio}>{bioValue}</h2>
                        </div>)
                    }
                    
                    {
                       (matchee&&open)? (
                            <div className={styles.buttons}>
                            <button onClick={()=>{ setEditBio(true)
                            setOpen(false)
                            }} className={styles.edit}>
                               Edit
                            </button>
                            <Link
						href={`#`}
						className={styles.upload}
					>
						Upload Photo
					</Link>
                            </div>
                        ):(<p></p>)
                    }
                    {
                       editBio&&(<>
                         <h1 className={styles.headingText}>Change Bio</h1>
                        <form>
                            <div className={styles.texta}>
                            <textarea
							className={styles.edit_textarea}
							name='bio'
							id='bio'
							// rows={10}
                           // ref={fetchBio}
                           onChange={(e)=>{
                            setBioValue(e.target.value)
                            console.log(bioValue);
                           }}
							value={bioValue}>
						</textarea>
                            </div>
						<div className={styles.save_button}>
                        <button 
                        onClick={(e)=> {
                            e.preventDefault(),
                           // captureBio(),
                           
                        setEditBio(false),
                        updateBio(),
                        setOpen(true)
                       // ,location.reload()
                             }
                        }
                        className={styles.save}>Save</button>
                        </div>
                        
                        </form>
                        </> 
                        )
                    }


        </>
    )
}

export default coupleMatch;