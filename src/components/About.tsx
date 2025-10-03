import { CheckCircle, Zap, Shield, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()
  const capabilities = [
    {
      icon: Zap,
      title: t('about.capabilities.realtime.title'),
      description: t('about.capabilities.realtime.desc'),
    },
    {
      icon: Shield,
      title: t('about.capabilities.risk.title'),
      description: t('about.capabilities.risk.desc'),
    },
    {
      icon: Globe,
      title: t('about.capabilities.intelligence.title'),
      description: t('about.capabilities.intelligence.desc'),
    },
    {
      icon: CheckCircle,
      title: t('about.capabilities.launch.title'),
      description: t('about.capabilities.launch.desc'),
    },
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                {t('about.title.part1')}{' '}
                <span className="gradient-text">{t('about.title.highlight')}</span>{' '}
                {t('about.title.part2')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => {
                const IconComponent = capability.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold gradient-text mb-2">{capability.title}</h3>
                      <p className="text-sm text-muted-foreground">{capability.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">AI</span>
                </div>
                <h3 className="text-xl font-bold gradient-text mb-2">{t('about.card.title')}</h3>
                <p className="text-muted-foreground text-sm">{t('about.card.subtitle')}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <span className="text-sm font-medium">{t('about.card.metrics.market')}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                  <span className="text-sm font-medium">{t('about.card.metrics.risk')}</span>
                  <div className="text-sm gradient-text font-semibold">
                    {t('about.card.metrics.accuracy')}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <span className="text-sm font-medium">{t('about.card.metrics.launch')}</span>
                  <div className="text-sm gradient-text font-semibold">
                    {t('about.card.metrics.realtime')}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-primary opacity-20 rounded-3xl blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
