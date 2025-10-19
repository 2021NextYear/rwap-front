import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Share2, Users, Gift, Trophy, Star, ExternalLink, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingShapes from '@/components/FloatingShapes'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { collectReward, getUserInfo } from '@/utils'
import { add, div, times } from '@/lib'
import { useGlobalInfo, useUserInfo } from '@/hooks/useContract'

const Referral = () => {
  const { address } = useAccount()
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const [collectLoading, setCollectLoading] = useState(false)
  const globalInfo = useGlobalInfo()
  const userInfo = useUserInfo()
  const referralLink = useMemo(() => `${window.location.origin}?referral=${address}`, [address])
  const stats = [
    {
      label: t('referral.stats.direct'),
      value: userInfo.directInviteCount,
      icon: Users,
      reward: '',
    },
    { label: t('referral.stats.indirect'), value: userInfo.indirectCount, icon: Users, reward: '' },
    {
      label: t('referral.stats.inviteMiningReward'),
      value: userInfo.claimedRewards.inviteMiningReward,
      icon: Gift,
      reward: '',
    },
    {
      label: t('referral.stats.inviteStakingReward'),
      value: userInfo.claimedRewards.inviteStakingReward,
      icon: Gift,
      reward: '',
    },
    {
      label: t('referral.stats.teamUsers'),
      value: add(userInfo.directInviteCount, userInfo.indirectCount),
      icon: Trophy,
      reward: '',
    },
  ]

  const rewardTiers = [
    { level: 'Level1', invites: '', commission: '10%', bonus: '节点分红', color: 'bg-amber-500' },
    { level: 'Level2', invites: '', commission: '5%', bonus: '节点分红', color: 'bg-gray-400' },
  ]

  const proportion = useMemo(() => {
    let _p = '0'
    if (userInfo.nodeType === 1) {
      _p = times(div(userInfo.performance, globalInfo.ordinaryNodesKpi), 100)
    } else if (userInfo.nodeType === 2) {
      _p = times(div(userInfo.performance, globalInfo.superNodesKpi), 100)
    }
    return _p
  }, [globalInfo, userInfo])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: t('common.toast.copy.successTitle'),
        description: t('common.toast.copy.successDesc'),
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: t('common.toast.copy.failTitle'),
        description: t('common.toast.copy.failDesc'),
        variant: 'destructive',
      })
    }
  }

  const collect = async () => {
    try {
      setCollectLoading(true)
      await collectReward('claimDividendRewards')
      toast({ title: t('common.toast.claim.success') })
    } catch (error) {
      toast({ title: t('common.toast.claim.fail') })
    }
    setCollectLoading(false)
  }

  return (
    <div className="relative min-h-screen">
      <FloatingShapes />
      <Header />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-5 px-4 sm:py-10 ">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {t('referral.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('referral.subtitle')}
            </p>

            {/* Referral Link Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    {t('referral.link.title')}
                  </CardTitle>
                  <CardDescription>{t('referral.link.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="font-mono text-sm" />
                    <Button onClick={() => copyToClipboard(referralLink)} className="flex-shrink-0">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-5 px-4 sm:py-16 ">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {stat.reward}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        <span className="text-primary">{stat.value}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-5 px-4 sm:py-16 ">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rewards">{t('referral.tabs.rewards')}</TabsTrigger>
                <TabsTrigger value="my-referrals">{t('referral.tabs.dividend')}</TabsTrigger>
              </TabsList>

              {/* Rewards System */}
              <TabsContent value="rewards" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">{t('referral.rewards.title')}</h2>
                  <p className="text-muted-foreground">{t('referral.rewards.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {rewardTiers.map((tier, index) => (
                    <Card
                      key={index}
                      className="bg-gradient-card border-0 backdrop-blur-sm relative overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 w-full h-1 ${tier.color}`} />
                      <CardHeader className="text-center">
                        <CardTitle className="text-lg">{tier.level}</CardTitle>
                        <CardDescription>{tier.invites} 邀请</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-1">
                            <span className="text-primary">{tier.commission}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">佣金比例</div>
                        </div>

                        <div className="space-y-2 text-sm">
                          {/* <div className="flex justify-between">
                            <span>节点权益</span>
                            <span className="font-medium">{tier.bonus}</span>
                          </div> */}
                          {/* <div className="flex justify-between">
                            <span>状态</span>
                            <Badge variant={index === 3 ? 'default' : 'secondary'}>
                              {index === 3 ? '当前等级' : '未解锁'}
                            </Badge>
                          </div>  */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Rules */}
                {/* <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>邀请规则</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">奖励机制</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• 邀请好友参与挖矿可获得第一层10%，第二层5%的挖矿返佣</li>
                          <li>• 矿机算力大于3000，同时邀请5个人可享受手续费返佣</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">注意事项</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• 奖励实时发放，无需手动领取</li>
                          <li>• 禁止刷单，一经发现取消资格</li>
                          <li>• 被邀请人需完成实名认证</li>
                          <li>• 邀请奖励永久有效</li>
                        </ul>
                      </div> 
                    </div>
                  </CardContent>
                </Card> */}
              </TabsContent>

              {/* My Referrals */}
              <TabsContent value="my-referrals" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">{t('referral.dividend.title')}</h2>
                  {/* <p className="text-muted-foreground">查看您邀请的用户详情</p> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  {/* <div className="lg:col-span-2">
                    <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>邀请列表</CardTitle>
                        <CardDescription>您邀请的用户和对应奖励</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border/40">
                                <th className="text-left p-4">用户地址</th>
                                <th className="text-left p-4">注册时间</th>
                                <th className="text-left p-4">状态</th>
                                <th className="text-left p-4">奖励</th>
                              </tr>
                            </thead>
                            <tbody>
                              {myReferrals.map((referral, index) => (
                                <tr key={index} className="border-b border-border/20">
                                  <td className="p-4 font-mono text-sm">{referral.address}</td>
                                  <td className="p-4">{referral.joinDate}</td>
                                  <td className="p-4">
                                    <Badge
                                      variant={referral.status === '活跃' ? 'default' : 'secondary'}
                                    >
                                      {referral.status}
                                    </Badge>
                                  </td>
                                  <td className="p-4 text-primary font-medium">
                                    {referral.rewards}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div> */}

                  <div>
                    <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>{t('referral.dividend.title')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              {t('referral.dividend.pool')}
                            </span>
                            <span className="font-medium">
                              <span className="text-primary">{globalInfo.dividendPoolAmount}</span> RWAF
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              {t('referral.dividend.proportion')}
                            </span>
                            <span className="font-medium">
                              <span className="text-primary">{proportion}</span> %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              {t('referral.dividend.claimed')}
                            </span>
                            <span className="font-medium">
                              <span className="text-primary">{userInfo.claimedRewards.dividendReward}</span> RWAF
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              {t('referral.dividend.unclaimed')}
                            </span>
                            <span className="font-medium">
                              <span className="text-primary">{userInfo.claimableRewards.dividendReward}</span> RWAF
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              {t('referral.dividend.tip')}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border/40">
                          <Button
                            className="w-full"
                            size="sm"
                            onClick={collect}
                            loading={collectLoading}
                            disabled={
                              collectLoading ||
                              Number(userInfo.claimableRewards.dividendReward) === 0
                            }
                          >
                            {t('referral.claim')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Referral
