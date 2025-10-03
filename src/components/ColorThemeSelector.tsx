import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ColorThemeSelector = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    {
      name: '深邃蓝紫',
      id: 'blue-purple',
      primary: '240 100% 65%',
      accent: '200 100% 65%',
      description: '专业科技感',
    },
    {
      name: '霓虹青绿',
      id: 'cyan-green',
      primary: '180 100% 60%',
      accent: '160 100% 65%',
      description: '未来科幻风',
    },
    {
      name: '暖橙红',
      id: 'orange-red',
      primary: '15 100% 60%',
      accent: '340 100% 65%',
      description: '活力动感',
    },
    {
      name: '经典紫粉',
      id: 'purple-pink',
      primary: '270 91% 65%',
      accent: '320 73% 69%',
      description: '优雅时尚',
    },
  ]

  const applyTheme = (theme: any) => {
    const root = document.documentElement

    switch (theme.id) {
      case 'cyan-green':
        root.style.setProperty('--primary', '180 100% 60%')
        root.style.setProperty('--primary-variant', '170 100% 65%')
        root.style.setProperty('--accent', '160 100% 65%')
        root.style.setProperty(
          '--gradient-primary',
          'linear-gradient(135deg, hsl(180 100% 60%) 0%, hsl(170 100% 65%) 50%, hsl(160 100% 70%) 100%)'
        )
        break
      case 'orange-red':
        root.style.setProperty('--primary', '15 100% 60%')
        root.style.setProperty('--primary-variant', '25 100% 65%')
        root.style.setProperty('--accent', '340 100% 65%')
        root.style.setProperty(
          '--gradient-primary',
          'linear-gradient(135deg, hsl(15 100% 60%) 0%, hsl(25 100% 65%) 50%, hsl(340 100% 70%) 100%)'
        )
        break
      case 'purple-pink':
        root.style.setProperty('--primary', '270 91% 65%')
        root.style.setProperty('--primary-variant', '300 91% 70%')
        root.style.setProperty('--accent', '320 73% 69%')
        root.style.setProperty(
          '--gradient-primary',
          'linear-gradient(135deg, hsl(270 91% 65%) 0%, hsl(300 91% 70%) 50%, hsl(320 73% 69%) 100%)'
        )
        break
      default: // blue-purple
        root.style.setProperty('--primary', '240 100% 65%')
        root.style.setProperty('--primary-variant', '260 100% 70%')
        root.style.setProperty('--accent', '200 100% 65%')
        root.style.setProperty(
          '--gradient-primary',
          'linear-gradient(135deg, hsl(240 100% 65%) 0%, hsl(260 100% 70%) 50%, hsl(280 90% 75%) 100%)'
        )
    }

    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Palette className="w-6 h-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="glass rounded-2xl p-6 w-72 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold gradient-text">{t('themeSelector.title')}</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {themes.map((theme, index) => (
            <button
              key={index}
              onClick={() => applyTheme(theme)}
              className="w-full text-left p-3 rounded-lg glass hover:shadow-glow transition-smooth group"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-lg shadow-inner"
                  style={{
                    background: `hsl(${theme.primary})`,
                  }}
                ></div>
                <div>
                  <div className="font-semibold text-sm">{theme.name}</div>
                  <div className="text-xs text-muted-foreground">{theme.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => setIsOpen(false)}
        className="w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-glow"
      >
        <Palette className="w-6 h-6 text-white" />
      </Button>
    </div>
  )
}

export default ColorThemeSelector
