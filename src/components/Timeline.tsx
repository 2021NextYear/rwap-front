import { Calendar, Rocket, Target, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Timeline = () => {
  const { t } = useTranslation()
  const milestones = [
    {
      quarter: 'Q2 2025',
      title: t('timeline.q3.title'),
      icon: Rocket,
      status: 'completed',
      items: [
        t('timeline.q3.items.0'),
        t('timeline.q3.items.1'),
        t('timeline.q3.items.2'),
        t('timeline.q3.items.3'),
      ],
    },
    {
      quarter: 'Q3 2025',
      title: t('timeline.q4.title'),
      icon: Target,
      status: 'completed',
      items: [
        t('timeline.q4.items.0'),
        t('timeline.q4.items.1'),
        t('timeline.q4.items.2'),
        t('timeline.q4.items.3'),
      ],
    },
    {
      quarter: 'Q4 2025',
      title: t('timeline.q1.title'),
      icon: Calendar,
      status: 'in-progress',
      items: [
        t('timeline.q1.items.0'),
        t('timeline.q1.items.1'),
        t('timeline.q1.items.2'),
        t('timeline.q1.items.3'),
      ],
    },
    {
      quarter: 'Q1 2026',
      title: t('timeline.q2.title'),
      icon: Trophy,
      status: 'upcoming',
      items: [
        t('timeline.q2.items.0'),
        t('timeline.q2.items.1'),
        t('timeline.q2.items.2'),
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-gradient-primary'
      case 'upcoming':
        return 'bg-muted'
      default:
        return 'bg-muted'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('timeline.status.completed')
      case 'in-progress':
        return t('timeline.status.inprogress')
      case 'upcoming':
        return t('timeline.status.upcoming')
      default:
        return ''
    }
  }

  return (
    <section id="timeline" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('timeline.title.highlight')}</span> &{' '}
            {t('timeline.title.tail')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-primary opacity-30"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              const isEven = index % 2 === 0

              return (
                <div key={index} className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background bg-gradient-primary z-10"></div>

                  <div className={`w-full ${isEven ? 'pr-1/2' : 'pl-1/2 flex justify-end'}`}>
                    <div className={`w-full max-w-md ${isEven ? 'mr-8' : 'ml-8'}`}>
                      <div className="glass rounded-2xl p-6 hover:shadow-glow transition-smooth">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold gradient-text">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground">{milestone.quarter}</p>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                              milestone.status
                            )}`}
                          >
                            {getStatusText(milestone.status)}
                          </div>
                        </div>

                        <ul className="space-y-2">
                          {milestone.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full"></div>
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
