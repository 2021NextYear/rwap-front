import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Stats = () => {
  const { t } = useTranslation()
  const stats = [
    {
      icon: DollarSign,
      value: '$2.5M+',
      label: t('stats.items.marketCap.label'),
      description: t('stats.items.marketCap.desc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      value: '15K+',
      label: t('stats.items.community.label'),
      description: t('stats.items.community.desc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      value: '250%',
      label: t('stats.items.growth.label'),
      description: t('stats.items.growth.desc'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Activity,
      value: '24/7',
      label: t('stats.items.analysis.label'),
      description: t('stats.items.analysis.desc'),
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-background via-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="glass rounded-2xl p-6 text-center hover:shadow-glow transition-smooth group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>

                <h3 className="font-semibold text-foreground mb-1">{stat.label}</h3>

                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
