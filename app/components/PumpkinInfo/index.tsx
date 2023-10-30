import { FaInstagram } from 'react-icons/fa';
import Image from 'next/legacy/image';
import Link from 'next/link';
import Navbar from '../Navbar';

interface PumpkinInfoProps {
    name: string;
    bio: string;
    imgSrc: string;
    hickies: number;
    pumpkins: number;
    instagram: string;
    profile: string;
    page: string;
}

const PumpkinInfo: React.FC<PumpkinInfoProps> = ({ name, bio, imgSrc, hickies, instagram, pumpkins, profile, page }) => {
    return (
        <div className="relative h-screen mt-2 flex items-center justify-center">
            <div className="absolute text-center text-themed-orange md:w-[50%] rounded-xl px-8 py-2 z-50">
                <h1 className="text-4xl font-bold mb-4">{name}</h1>
                <p className="text-lg font-semibold">{bio}</p>
                {
                    page !== 'home' &&
                    <div className="flex items-center justify-between mx-auto mt-4">
                        {
                            page !== 'profile' &&
                            <Link href={instagram} target='_blank'>
                                <FaInstagram className="text-2xl mr-2" />
                            </Link>
                        }
                        <p className="mr-4 font-bold">
                            {pumpkins} Pumpkins
                        </p>
                        <p className="mr-4 font-bold">
                            {hickies} Hickies
                        </p>
                        {
                            page !== 'profile' && page !== 'stem' &&
                            <Link href={`/profile/${profile}`} className='font-bold p-2 rounded-lg border-2 text-white'>
                                Profile
                            </Link>
                        }
                    </div>
                }
            </div>
            <div className="relative bg-black z-200 w-full h-full">
                <Image
                    src={imgSrc}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
        </div>
    );
};

export default PumpkinInfo;
