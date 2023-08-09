// components/InfoComponent.tsx
import Image from 'next/legacy/image';

interface PumpkinInfoProps {
    name: string;
    bio: string;
    imgSrc: string;
}

const PumpkinInfo: React.FC<PumpkinInfoProps> = ({ name, bio, imgSrc }) => {
    return (
        <div className="relative h-screen mt-2 flex items-center justify-center">
            <div className="absolute text-center text-themed-orange rounded-xl px-8 py-2 z-50">
                <h1 className="text-4xl font-bold mb-4">{name}</h1>
                <p className="text-lg font-semibold">{bio}</p>
            </div>
            <div className="bg-black z-200 w-full h-full">
                <Image
                    src={imgSrc}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default PumpkinInfo;
