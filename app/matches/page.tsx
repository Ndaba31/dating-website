import Footer from "../components/Footer"
import PumpkinInfo from "../components/PumpkinInfo"
import { peopleData } from "../page"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pumpkins',
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