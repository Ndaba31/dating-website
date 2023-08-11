import Hero from './components/Hero'
import PumpkinInfo from './components/PumpkinInfo'
import DiscoverMore from './components/DiscoverMore';
import Footer from './components/Footer';

export const peopleData = [
  {
    name: "Linda Dlamini",
    bio: "I am a 22 year old foodie, am a Cancer, and love money.",
    imgSrc: "/linda.jpeg",
    hickies: 809,
    pumpkins: 37,
    instagram: "https://www.instagram.com/linda_dlami/",
    profile: "linda_dlamini"
  },
  {
    name: "Ntombi Tfwala",
    bio: "I am a 27 year old Aries, who loves to have a good time.",
    imgSrc: "/ntombi.jpeg",
    hickies: 150,
    pumpkins: 20,
    instagram: "https://www.instagram.com/ntombi.kayise_/",
    profile: "ntombi_tfwala"
  },
  {
    name: "Chantelle Du-Pont",
    bio: "Let’s spare the semantics now, we’re grown ups, I like money, I come into your life only if you have it to suck all of it off like the cute little demon I am, and move onto someone richer and older when it’s done. xoxo",
    imgSrc: "/chantelle.jpeg",
    hickies: 150,
    pumpkins: 20,
    instagram: "https://www.instagram.com/ntombi.kayise_/",
    profile: "ntombi_tfwala"
  },
  {
    name: "Lesedi Mpofu",
    bio: "My talents are cooking, cleaning, singing, maths and spending your money.",
    imgSrc: "/lesedi.jpeg",
    hickies: 0,
    pumpkins: 0,
    instagram: "https://www.instagram.com/lesedii_mpofu/",
    profile: "lesedi_tfwala"
  },
  {
    name: "Lisa Myeni",
    bio: "No such thing as love without me, such as there is such a thing like sunshine without the sun, or love without money",
    imgSrc: "/lisa.jpeg",
    hickies: 566,
    pumpkins: 9,
    instagram: "https://www.instagram.com/lisa_myeni/",
    profile: "lisa_myeni"
  },
  {
    name: "Lynette Green-Thompson",
    bio: "I am looking for someone to connect with, a better half, twin, soul mate, and yes, with money.",
    imgSrc: "/lynette.jpeg",
    hickies: 60,
    pumpkins: 10,
    instagram: "https://www.instagram.com/lynettegreenthompson/",
    profile: "lynette_green_thompson"
  },
];

const discoverCards = [
  {
    name: "Linda Dlamini",
    link: "I am a 22 year old foodie, am a Cancer, and love money.",
    imgSrc: "/linda.jpeg"
  },
  {
    name: "Ntombi Tfwala",
    link: "I am a 27 year old Aries, who loves to have a good time.",
    imgSrc: "/ntombi.jpeg"
  },
  {
    name: "Chantelle Du-Pont",
    link: "Let’s spare the semantics now, we’re grown ups, I like money, I come into your life only if you have it to suck all of it off like the cute little demon I am, and move onto someone richer and older when it’s done. xoxo",
    imgSrc: "/chantelle.jpeg"
  },
  {
    name: "Linda Dlamini",
    link: "I am a 22 year old foodie, am a Cancer, and love money.",
    imgSrc: "/linda.jpeg"
  },
  {
    name: "Ntombi Tfwala",
    link: "I am a 27 year old Aries, who loves to have a good time.",
    imgSrc: "/ntombi.jpeg"
  },
  {
    name: "Chantelle Du-Pont",
    link: "Let’s spare the semantics now, we’re grown ups, I like money, I come into your life only if you have it to suck all of it off like the cute little demon I am, and move onto someone richer and older when it’s done. xoxo",
    imgSrc: "/chantelle.jpeg"
  },
  {
    name: "Linda Dlamini",
    link: "I am a 22 year old foodie, am a Cancer, and love money.",
    imgSrc: "/linda.jpeg"
  },
  {
    name: "Ntombi Tfwala",
    link: "I am a 27 year old Aries, who loves to have a good time.",
    imgSrc: "/ntombi.jpeg"
  },
  {
    name: "Chantelle Du-Pont",
    link: "Let’s spare the semantics now, we’re grown ups, I like money, I come into your life only if you have it to suck all of it off like the cute little demon I am, and move onto someone richer and older when it’s done. xoxo",
    imgSrc: "/chantelle.jpeg"
  },
  {
    name: "Linda Dlamini",
    link: "I am a 22 year old foodie, am a Cancer, and love money.",
    imgSrc: "/linda.jpeg"
  },
  {
    name: "Ntombi Tfwala",
    link: "I am a 27 year old Aries, who loves to have a good time.",
    imgSrc: "/ntombi.jpeg"
  },
  {
    name: "Chantelle Du-Pont",
    link: "Let’s spare the semantics now, we’re grown ups, I like money, I come into your life only if you have it to suck all of it off like the cute little demon I am, and move onto someone richer and older when it’s done. xoxo",
    imgSrc: "/chantelle.jpeg"
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      {peopleData.slice(0, 3).map(({ name, bio, imgSrc, hickies, pumpkins, instagram, profile }, index) => (
        <PumpkinInfo
          key={index}
          page='home'
          name={name}
          bio={bio}
          imgSrc={imgSrc}
          hickies={hickies}
          pumpkins={pumpkins}
          instagram={instagram}
          profile={profile}
        />
      ))}
      <DiscoverMore cards={discoverCards} />
      <Footer />
    </main>
  )
}
