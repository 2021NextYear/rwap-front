import { TrendingUp, Code, Building } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Features = () => {
  const { t } = useTranslation()
  const features = [
    {
      icon: TrendingUp,
      title: t('features.items.investors.title'),
      description: t('features.items.investors.desc'),
      color: 'text-blue-500',
    },
    {
      icon: Code,
      title: t('features.items.developers.title'),
      description: t('features.items.developers.desc'),
      color: 'text-purple-500',
    },
    {
      icon: Building,
      title: t('features.items.institutions.title'),
      description: t('features.items.institutions.desc'),
      color: 'text-green-500',
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('features.title.part1')}{' '}
            <span className="gradient-text">{t('features.title.highlight1')}</span>{' '}
            {t('features.title.part2')}{' '}
            <span className="gradient-text">{t('features.title.highlight2')}</span>
          </h2>
        </div>

        <div className="mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-12 gradient-text">
            {t('features.subtitle')}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="glass rounded-2xl p-8 text-center hover:shadow-glow transition-smooth group"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-4 gradient-text">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
