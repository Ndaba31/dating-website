
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import PumpkinInfo from '@/app/components/PumpkinInfo'
import Details from '@/app/components/PumpkinInfo/Details'
import { peopleData } from '@/app/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My Profile',
}

const Profile = () => {
    return (
        <main>
            <Navbar />
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
            <Details />
            <Footer />
        </main>
    )
}

export default Profile