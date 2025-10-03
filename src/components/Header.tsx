import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { i18n, t } = useTranslation()

  const language = i18n.language
  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.mint'), href: '/mint' },
    { label: t('nav.staking'), href: '/staking' },
    { label: t('nav.referral'), href: '/referral' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass transition-smooth">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold gradient-text">rwaf</span>
            </div>
            <div
              className="ml-2 text-xl font-bold"
              onClick={() => {
                const newLng = language === 'en' ? 'zh-Hans' : 'en'

                i18n.changeLanguage(newLng)

                localStorage.setItem('lang', newLng)
              }}
            >
              {language}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ConnectButton chainStatus="none" showBalance={false} />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-smooth"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/40">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
