
import Footer from '@/app/components/Footer'
import PumpkinInfo from '@/app/components/PumpkinInfo'
import { peopleData } from '@/app/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Discover',
}

const Matches = () => {
    return (
        <main>
            {
                peopleData.map(({ name, bio, imgSrc, hickies, pumpkins, instagram, profile }, index) => (
                    <PumpkinInfo
                        key={index}
                        page='matches'
                        name={name}
                        bio={bio}
                        imgSrc={imgSrc}
                        hickies={hickies}
                        pumpkins={pumpkins}
                        instagram={instagram}
                        profile={profile}
                    />
                ))
            }
            <Footer />
        </main>
    )
}

export default Matches