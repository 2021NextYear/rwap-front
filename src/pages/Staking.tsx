import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, Lock, Unlock, TrendingUp, Clock, Coins, Trophy, DollarSign } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingShapes from '@/components/FloatingShapes'
import { collectReward, genErc20ApproveForContract, getReferral, getUserInfo } from '@/utils'
import { CHAIN_CONFIG } from '@/constants'
import { useAccount } from 'wagmi'
import {
  div,
  gt,
  number2Big,
  sanitizeInput,
  sendTransaction,
  stakeMiningInterface,
  times,
  toFixed,
} from '@/lib'
import { useBalance } from '@/hooks/useBalance'
import { useGlobalInfo, useUserInfo } from '@/hooks/useContract'
import { useToast } from '@/hooks/use-toast'
import { isAddress } from 'viem'
import { useTranslation } from 'react-i18next'

const Staking = () => {
  const { totalStakingAmount, stakingAddresses, stakingClaimedRewards } = useGlobalInfo()
  const { t } = useTranslation()
  const { toast } = useToast()

  const { RWAT } = useBalance()
  const chainId = CHAIN_CONFIG.chainId
  const { rwat, staking, usdt } = CHAIN_CONFIG.contract
  const { address } = useAccount()
  const [stakeSelfAmount, setStakeSelfAmount] = useState('')
  const [stakeOtherAmount, setStakeOtherAmount] = useState('')
  const [otherAddress, setOtherAddress] = useState('')
  const [miningLoading, setMiningLoading] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)
  const [collectLoading, setCollectLoading] = useState(false)

  const userInfo = useUserInfo()

  const stakingStats = [
    {
      label: t('staking.stats.total'),
      value: `${totalStakingAmount} RWAF`,
      icon: Lock,
      trend: '+12.5%',
    },
    { label: t('staking.stats.apy'), value: '91.25%', icon: TrendingUp, trend: '+2.1%' },
    { label: t('staking.stats.count'), value: stakingAddresses, icon: Wallet, trend: '+156' },
    {
      label: t('staking.stats.totalRewards'),
      value: `${stakingClaimedRewards} RWAF`,
      icon: Trophy,
      trend: '+8.2%',
    },
  ]

  const stakingForSelf = async () => {
    try {
      const _amount = number2Big(stakeSelfAmount, 18)
      const erc20Approve = await genErc20ApproveForContract(
        rwat,
        staking,
        address,
        _amount,
        chainId
      )
      if (erc20Approve) {
        setApproveLoading(true)
        await sendTransaction(erc20Approve, chainId)
      }

      const calldata = stakeMiningInterface.encodeFunctionData('stakingForSelf', [
        _amount,
        getReferral(),
      ])
      setMiningLoading(true)

      await sendTransaction({ to: staking, data: calldata, value: '0' }, chainId)
      toast({ title: t('common.toast.stake.success') })
    } catch (error) {
      toast({ title: t('common.toast.stake.fail') })
    }
    setApproveLoading(false)
    setMiningLoading(false)
  }

  const stakingForOther = async () => {
    try {
      const _amount = number2Big(stakeOtherAmount, 18)
      const erc20Approve = await genErc20ApproveForContract(
        rwat,
        staking,
        address,
        _amount,
        chainId
      )
      if (erc20Approve) {
        setApproveLoading(true)
        await sendTransaction(erc20Approve, chainId)
      }

      const calldata = stakeMiningInterface.encodeFunctionData('stakingForOther', [
        _amount,
        otherAddress,
      ])
      setMiningLoading(true)

      await sendTransaction({ to: staking, data: calldata, value: '0' }, chainId)
      toast({ title: t('common.toast.stake.success') })
    } catch (error) {
      toast({ title: t('common.toast.stake.fail') })
    }
    setApproveLoading(false)
    setMiningLoading(false)
  }

  const collect = async () => {
    try {
      setCollectLoading(true)
      await collectReward('claimStakingRewards')
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
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {t('staking.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('staking.subtitle')}
            </p>
          </div>
        </section>
        {/* Staking Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stakingStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {stat.trend}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Staking Interface */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Staking Operations */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{t('staking.ops.title')}</CardTitle>
                    <CardDescription>{t('staking.ops.desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      {t('staking.balance')}
                      {RWAT}
                    </div>

                    <Tabs defaultValue="stake" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stake">{t('staking.tabs.stake')}</TabsTrigger>
                        <TabsTrigger value="unstake">{t('staking.tabs.unstake')}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="stake" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t('staking.amount.label')}
                          </label>
                          <div className="relative">
                            <Input
                              placeholder={t('staking.amount.placeholder')}
                              value={stakeSelfAmount}
                              onChange={e =>
                                setStakeSelfAmount(sanitizeInput(e.target.value, 4, false))
                              }
                              className="pr-20 text-sm"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => {
                                setStakeSelfAmount(toFixed(RWAT, 4))
                              }}
                            >
                              {t('common.max')}
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {['25%', '50%', '75%'].map((percent, i) => (
                            <Button
                              key={percent}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setStakeSelfAmount(times(RWAT, (i + 1) * 0.25, 4))
                              }}
                            >
                              {percent}
                            </Button>
                          ))}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>{t('staking.estimate.year')}</span>
                            <span className="text-primary">
                              {Number(stakeSelfAmount)
                                ? times(div(times(stakeSelfAmount, 5), 2000), 365)
                                : '0'}{' '}
                              RWAF
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('staking.estimate.day')}</span>
                            <span className="text-primary">
                              {Number(stakeSelfAmount) ? div(times(stakeSelfAmount, 5), 2000) : '0'}{' '}
                              RWAF
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          size="lg"
                          disabled={!stakeSelfAmount || miningLoading || gt(stakeSelfAmount, RWAT)}
                          onClick={stakingForSelf}
                          loading={miningLoading}
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          {t(approveLoading ? 'staking.approve' : 'staking.cta.stake')}
                        </Button>
                      </TabsContent>

                      <TabsContent value="unstake" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t('staking.unstake.label')}
                          </label>
                          <div className="relative">
                            <Input
                              placeholder={t('staking.unstake.amountPlaceholder')}
                              value={stakeOtherAmount}
                              onChange={e =>
                                setStakeOtherAmount(sanitizeInput(e.target.value, 4, false))
                              }
                              className="pr-20"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => {
                                setStakeOtherAmount(toFixed(RWAT, 4))
                              }}
                            >
                              {t('common.max')}
                            </Button>
                          </div>

                          <div className="relative mt-4">
                            <Input
                              placeholder={t('staking.unstake.addressPlaceholder')}
                              value={otherAddress}
                              onChange={e => setOtherAddress(e.target.value)}
                              className="pr-20"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-muted/20 rounded-lg border border-border/40">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4" />
                            {t('staking.notice.title')}
                          </div>
                          <p className="text-sm">{t('staking.notice.body')}</p>
                        </div>

                        <Button
                          className="w-full"
                          size="lg"
                          disabled={
                            !stakeOtherAmount ||
                            miningLoading ||
                            !isAddress(otherAddress) ||
                            gt(stakeOtherAmount, RWAT)
                          }
                          onClick={stakingForOther}
                          loading={miningLoading}
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          {t(approveLoading ? 'staking.approve' : 'staking.tabs.unstake')}
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* My Staking Info */}
              <div>
                <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      {t('staking.my.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {t('staking.my.total')}
                        </span>
                        <span className="font-medium">{userInfo.totalStakingAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {t('staking.my.claimed')}
                        </span>
                        <span className="font-medium text-primary">
                          {times(userInfo.claimedRewards.stakingReward, 1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {t('staking.my.pending')}
                        </span>
                        <span className="font-medium text-primary">
                          {userInfo.claimableRewards.stakingReward}
                        </span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">质押占比</span>
                        <span className="font-medium">{myStakingData.stakingPower}</span>
                      </div> */}
                    </div>

                    {/* <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>质押进度</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div> */}

                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        size="sm"
                        loading={collectLoading}
                        disabled={
                          collectLoading || Number(userInfo.claimableRewards.stakingReward) === 0
                        }
                        onClick={collect}
                      >
                        {t('staking.my.claim')} ({userInfo.claimableRewards.stakingReward})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Staking Pools */}
        {/* <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">质押池</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stakingPools.map(pool => (
                <Card key={pool.id} className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pool.name}</CardTitle>
                      <Badge variant={pool.id === 2 ? 'default' : 'secondary'}>
                        {pool.id === 2 ? '推荐' : pool.risk}
                      </Badge>
                    </div>
                    <CardDescription>{pool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{pool.apy}</div>
                      <div className="text-sm text-muted-foreground">年化收益率</div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>锁定期</span>
                        <span>{pool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>最小质押</span>
                        <span>{pool.minStake}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>总质押量</span>
                        <span>{pool.totalStaked}</span>
                      </div>
                    </div>

                    <Button className="w-full" variant={pool.id === 2 ? 'default' : 'outline'}>
                      {pool.id === 2 ? '立即质押' : '选择此池'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('staking.faq.title')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: t('staking.faq.q1'),
                  answer: t('staking.faq.a1'),
                },
                {
                  question: t('staking.faq.q2'),
                  answer: t('staking.faq.a2'),
                },
                {
                  question: t('staking.faq.q3'),
                  answer: t('staking.faq.a3'),
                },
                {
                  question: t('staking.faq.q4'),
                  answer: t('staking.faq.a4'),
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Staking
