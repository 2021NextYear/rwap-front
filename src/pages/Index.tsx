import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Timeline from '@/components/Timeline'
import Tokenomics from '@/components/Tokenomics'
import Footer from '@/components/Footer'
import FloatingShapes from '@/components/FloatingShapes'
import ColorThemeSelector from '@/components/ColorThemeSelector'

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <FloatingShapes />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Features />
        <About />
        <Stats />
        <Timeline />
        <Tokenomics />
      </main>
      <Footer />
      {/* <ColorThemeSelector /> */}
    </div>
  )
}

export default Index
