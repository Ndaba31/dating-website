// components/HeroSection.tsx
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative">
            {/* Background Hero Image */}
            <Image
                src="/home-asset.jpeg"
                alt="Hero Background"
                layout="fill"
                objectFit="cover"
                priority
            />

            {/* Overlay Image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Image
                    src="/pumpkin.png"
                    alt="Pumpkin Logo"
                    width={200} // Adjust the width as needed
                    height={200} // Adjust the height as needed
                />
            </div>
        </div>
    );
};

export default Hero;
