
import Footer from '@/app/components/Footer'
import PumpkinInfo from '@/app/components/PumpkinInfo'
import { peopleData } from '@/app/page'
import React from 'react'

const Page = ({ params }: { params: { stem: string } }) => {

    const stem = peopleData.filter(stem => stem.profile === params.stem)

    return (
        <main>
            <PumpkinInfo
                page='stem'
                name={stem[0].name}
                bio={stem[0].bio}
                imgSrc={stem[0].imgSrc}
                hickies={stem[0].hickies}
                pumpkins={stem[0].pumpkins}
                instagram={stem[0].instagram}
                profile={stem[0].profile}
            />
            <Footer />
        </main>
    )
}

export default Page