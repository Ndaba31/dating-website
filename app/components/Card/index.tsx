// components/Card.tsx

import { BeautyData } from "@/app/interfaces/BeautyData";
import Image from "next/image";

interface CardProps {
    beautyData: BeautyData;
}

const Card: React.FC<CardProps> = ({ beautyData }) => {
    const { image, beauty } = beautyData;

    return (
        <div className="flex flex-col items-center justify-center bg-transparent p-2 rounded-lg">
            <div className="w-56 h-56 md:w-56 md:h-56 lg:w-72 lg:h-72 mb-4 relative rounded-xl overflow-hidden">
                <Image
                    src={image}
                    alt={beauty}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg bg-to-tr from-orange-800 to-orange-700"
                />
                <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg bg-opacity-50 opacity-0 transition-opacity duration-300">{beauty}</p>
            </div>
        </div>
    );
};

export default Card;
