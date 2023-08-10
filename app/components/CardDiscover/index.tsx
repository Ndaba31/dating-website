import Image from 'next/legacy/image';

interface CardProps {
    imgSrc: string;
    name: string;
    link?: string;
}

const CardDiscover: React.FC<CardProps> = ({ imgSrc, name, link }) => {
    return (
        <div className="relative rounded-lg">
            <Image
                src={imgSrc}
                alt={name}
                width={350}
                height={500}
                quality={100}
                className='rounded-3xl'
            />
            <button className="absolute bottom-10 left-[25%] right-[25%] bg-themed-lightgrey py-2 text-black rounded-xl font-cursive">
                {name}
            </button>
        </div>
    );
};

export default CardDiscover;
