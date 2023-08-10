import CardDiscover from "../CardDiscover";

interface DiscoverMoreProps {
    cards: { imgSrc: string; name: string; link: string }[];
}

const DiscoverMore: React.FC<DiscoverMoreProps> = ({ cards }) => {
    // Group cards into rows of three
    const cardRows = [];
    for (let i = 0; i < cards.length; i += 3) {
        const row = cards.slice(i, i + 3);
        cardRows.push(row);
    }

    let count = 0;

    return (
        <div style={{ backgroundColor: '#ff7518' }}>
            <h2 className="text-center text-black text-3xl font-bold font-questrial pt-8">Discover More Dates</h2>
            <div className="mt-8 sm:px-0 w-full text-center">
                {cardRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col sm:flex-row justify-center md:mt-4 sm:mt-2">
                        {row.map((card, cardIndex) => {
                            count = cardIndex === 1 ? 1 : count + 3;

                            return (
                                <div
                                    key={cardIndex}
                                    className={`w-full sm:w-[30%] sm:mr-4 ${cardIndex === 1 && rowIndex === 0 ? 'md:mt-16' : (cardIndex !== 1 && rowIndex !== 0 ? 'md:-mt-16' : '')}`}
                                >
                                    <CardDiscover
                                        imgSrc={card.imgSrc}
                                        name={card.name}
                                        link={card.link}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoverMore;
