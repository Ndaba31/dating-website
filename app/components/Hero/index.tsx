import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-[#200B33] via-[#19171C] to=[#19276B] min-h-screen flex flex-col-reverse md:flex-row items-center w-full">
            <div className="w-full md:w-[40%] bg-opacity-70 p-8 text-center">
                <h1 className="text-4xl text-white font-bold">Pumpkin</h1>
                <p className="text-lg text-white font-cursive mb-4">Where true love meets fortune</p>
                <Link href='signup' className="bg-[#A238FF] text-white py-2 px-4 rounded-lg">
                    Register Now
                </Link>
            </div>
            <div className="w-full md:w-[60%]">
                <Image src="/lady.webp" width={500} height={500} quality={100} priority alt="Pumpkin Image" className="w-full h-full shadow-l-xl image-blurred-edge-inset" />
            </div>
        </div>
    );
};

export default Hero;
