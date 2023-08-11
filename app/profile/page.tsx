import { peopleData } from "../page"
import PumpkinInfo from "../components/PumpkinInfo"
import Footer from "../components/Footer"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My Profile',
}

const Profile = () => {
    return (
        <main>
            <PumpkinInfo
                page='profile'
                name={peopleData[5].name}
                bio={peopleData[5].bio}
                imgSrc={peopleData[5].imgSrc}
                hickies={peopleData[5].hickies}
                pumpkins={peopleData[5].pumpkins}
                instagram={peopleData[5].instagram}
                profile={peopleData[5].profile}
            />
            <Footer />
        </main>
    )
}

export default Profile