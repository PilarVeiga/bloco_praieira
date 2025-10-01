import Hero from '@/components/Hero'
import Donations from '@/components/Donations'
import Members from '@/components/Members'
import SocialLinks from '@/components/SocialLinks'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Donations />
      <Members />
      <SocialLinks />
    </main>
  )
}