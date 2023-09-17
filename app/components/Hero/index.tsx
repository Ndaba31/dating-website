// components/HeroSection.tsx
import Image from 'next/legacy/image';
import Navbar from '../Navbar';

const Hero = () => {
    return (
        <div className='relative h-[80vh] border-btm-curved'>
            {/* Background Hero Image */}
            <Image
                src="/home-asset.jpeg"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                priority
            />

            {/* Overlay Image at Bottom Center */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Image
                    src="/pumpkin.png"
                    alt="Pumpkin Logo"
                    width={200}
                    height={200}
                    quality={100}
                    priority
                />
            </div>
            <Navbar />
        </div>
    );
};

export default Hero;
