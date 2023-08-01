// components/FeaturedBeauties.tsx

import { BeautyData } from '@/app/interfaces/BeautyData';
import Card from '../Card';

const FeaturedBeauties = () => {

    const cardData: BeautyData[] = [
        { image: 'https://images.unsplash.com/photo-1613477757159-7fbb73011611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', beauty: 'Beauty 1' },
        { image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJlYXV0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', beauty: 'Beauty 2' },
        { image: 'https://images.unsplash.com/photo-1517498327491-f903e1e281cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGJlYXV0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', beauty: 'Beauty 3', description: 'description 3' },
        { image: 'https://images.unsplash.com/photo-1467632499275-7a693a761056?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJlYXV0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', beauty: 'Beauty 4' },
        { image: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJlYXV0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', beauty: 'Beauty 5', description: 'description 5' },
        { image: 'https://images.unsplash.com/photo-1581182815808-b6eb627a8798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJlYXV0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', beauty: 'Beauty 6' },
    ];

    return (
        <div className="bg-yellow-500 p-8">
            <h2 className="text-2xl font-semibold mb-4">Featured Beauties</h2>
            <div className="container mx-auto grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {cardData.map((beautyData, index) => (
                    <Card key={index} beautyData={beautyData} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedBeauties;
