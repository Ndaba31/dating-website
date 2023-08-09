import Image from 'next/legacy/image'
import Hero from './components/Hero'
import PumpkinInfo from './components/PumpkinInfo'

const peopleData = [
  {
    name: "Linda Dlamini",
    bio: "I am a 22 year old foodie, am a Cancer, and love money.",
    imgSrc: "/linda.jpeg"
  },
  {
    name: "Ntombi Tfwala",
    bio: "I am a 27 year old Aries, who loves to have a good time.",
    imgSrc: "/ntombi.jpeg"
  },
  {
    name: "Chantelle Du-Pont",
    bio: "Let’s spare the semantics now, we’re grown ups, I like money, I come into your life only if you have it to suck all of it off like the cute little demon I am, and move onto someone richer and older when it’s done. xoxo",
    imgSrc: "/chantelle.jpeg"
  }
];

export default function Home() {
  return (
    <main>
      <Hero />
      {peopleData.map(({ name, bio, imgSrc }, index) => (
        <PumpkinInfo
          key={index}
          name={name}
          bio={bio}
          imgSrc={imgSrc}
        />
      ))}
    </main>
  )
}
