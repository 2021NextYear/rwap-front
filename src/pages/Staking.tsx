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

const Staking = () => {
  const { totalStakingAmount, stakingAddresses, stakingClaimedRewards } = useGlobalInfo()
  const { toast } = useToast()

  const { RWAT } = useBalance()
  const chainId = CHAIN_CONFIG.chainId
  const { rwat, staking, usdt } = CHAIN_CONFIG.contract
  const { address } = useAccount()
  const [stakeSelfAmount, setStakeSelfAmount] = useState('')
  const [stakeOtherAmount, setStakeOtherAmount] = useState('')
  const [otherAddress, setOtherAddress] = useState('')
  const [miningLoading, setMiningLoading] = useState(false)
  const [collectLoading, setCollectLoading] = useState(false)

  const userInfo = useUserInfo()

  const stakingStats = [
    { label: '总质押量', value: `${totalStakingAmount} RWAT`, icon: Lock, trend: '+12.5%' },
    { label: '年化收益率', value: '18.5%', icon: TrendingUp, trend: '+2.1%' },
    { label: '质押者数量', value: stakingAddresses, icon: Wallet, trend: '+156' },
    { label: '总奖励发放', value: `${stakingClaimedRewards} RWAT`, icon: Trophy, trend: '+8.2%' },
  ]

  const stakingPools = [
    {
      id: 1,
      name: '灵活质押',
      apy: '12%',
      lockPeriod: '无锁定期',
      minStake: '100 RWAT',
      totalStaked: '800K RWAT',
      description: '随时存取，灵活便捷',
      risk: '低',
    },
    {
      id: 2,
      name: '30天锁定',
      apy: '18%',
      lockPeriod: '30天',
      minStake: '500 RWAT',
      totalStaked: '1.2M RWAT',
      description: '短期锁定，稳定收益',
      risk: '低',
    },
    {
      id: 3,
      name: '90天锁定',
      apy: '25%',
      lockPeriod: '90天',
      minStake: '1000 RWAT',
      totalStaked: '500K RWAT',
      description: '中期锁定，高额回报',
      risk: '中',
    },
  ]

  const myStakingData = {
    totalStaked: '5,000 RWAT',
    totalRewards: '125.5 RWAT',
    pendingRewards: '8.2 RWAT',
    stakingPower: '0.2%',
  }

  const stakingForSelf = async () => {
    try {
      setMiningLoading(true)
      const _amount = number2Big(stakeSelfAmount, 18)
      const erc20Approve = await genErc20ApproveForContract(
        rwat,
        staking,
        address,
        _amount,
        chainId
      )
      if (erc20Approve) {
        await sendTransaction(erc20Approve, chainId)
      }

      const calldata = stakeMiningInterface.encodeFunctionData('stakingForSelf', [
        _amount,
        getReferral(),
      ])

      await sendTransaction({ to: staking, data: calldata, value: '0' }, chainId)
      toast({ title: '质押成功' })
    } catch (error) {
      toast({ title: '质押失败' })
    }
    setMiningLoading(false)
  }

  const stakingForOther = async () => {
    try {
      setMiningLoading(true)
      toast({ title: '质押成功' })
      const _amount = number2Big(stakeOtherAmount, 18)
      const erc20Approve = await genErc20ApproveForContract(
        rwat,
        staking,
        address,
        _amount,
        chainId
      )
      if (erc20Approve) {
        await sendTransaction(erc20Approve, chainId)
      }

      const calldata = stakeMiningInterface.encodeFunctionData('stakingForOther', [
        _amount,
        otherAddress,
      ])

      await sendTransaction({ to: staking, data: calldata, value: '0' }, chainId)
    } catch (error) {
      toast({ title: '质押失败' })
    }
    setMiningLoading(false)
  }

  const collect = async () => {
    try {
      setCollectLoading(true)
      await collectReward()
      toast({ title: '领取成功' })
    } catch (error) {
      toast({ title: '领取失败' })
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
              RWAT 质押
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              质押 RWAT 代币，获得稳定收益，参与网络治理
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
                    <CardTitle>质押操作</CardTitle>
                    <CardDescription>质押或取消质押您的 RWAT 代币</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">我的RWAT余额：{RWAT}</div>

                    <Tabs defaultValue="stake" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stake">质押</TabsTrigger>
                        <TabsTrigger value="unstake">帮助质押</TabsTrigger>
                      </TabsList>

                      <TabsContent value="stake" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">质押数量</label>
                          <div className="relative">
                            <Input
                              placeholder="输入要质押的 RWAT 数量"
                              value={stakeSelfAmount}
                              onChange={e => setStakeSelfAmount(sanitizeInput(e.target.value))}
                              className="pr-20"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => {
                                setStakeSelfAmount(toFixed(RWAT, 6))
                              }}
                            >
                              最大
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
                                setStakeSelfAmount(times(RWAT, (i + 1) * 0.25, 6))
                              }}
                            >
                              {percent}
                            </Button>
                          ))}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>预估年收益</span>
                            <span className="text-primary">
                              {stakeSelfAmount
                                ? (parseFloat(stakeSelfAmount) * 0.18).toFixed(2)
                                : '0'}{' '}
                              RWAT
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>预估日收益</span>
                            <span className="text-primary">
                              {stakeSelfAmount
                                ? ((parseFloat(stakeSelfAmount) * 0.18) / 365).toFixed(4)
                                : '0'}{' '}
                              RWAT
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          size="lg"
                          disabled={!stakeSelfAmount || miningLoading}
                          onClick={stakingForSelf}
                          loading={miningLoading}
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          质押 RWAT
                        </Button>
                      </TabsContent>

                      <TabsContent value="unstake" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">帮助质押</label>
                          <div className="relative">
                            <Input
                              placeholder="输入要帮助质押的 RWAT 数量"
                              value={stakeOtherAmount}
                              onChange={e => setStakeOtherAmount(sanitizeInput(e.target.value))}
                              className="pr-20"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => {
                                setStakeOtherAmount(toFixed(RWAT, 6))
                              }}
                            >
                              最大
                            </Button>
                          </div>

                          <div className="relative mt-4">
                            <Input
                              placeholder="输入要帮助质押的地址"
                              value={otherAddress}
                              onChange={e => setOtherAddress(e.target.value)}
                              className="pr-20"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-muted/20 rounded-lg border border-border/40">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4" />
                            说明
                          </div>
                          <p className="text-sm">一旦帮助别人质押，就不能取消，请谨慎操作</p>
                        </div>

                        <Button
                          className="w-full"
                          size="lg"
                          variant="outline"
                          disabled={!stakeOtherAmount || miningLoading || !isAddress(otherAddress)}
                          onClick={stakingForOther}
                          loading={miningLoading}
                        >
                          <Unlock className="mr-2 h-4 w-4" />
                          帮助质押
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
                      我的质押
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">总质押量</span>
                        <span className="font-medium">{userInfo.totalStakingAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">累计奖励</span>
                        <span className="font-medium text-primary">
                          {times(userInfo.claimedRewards.stakingReward, 1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">待领取奖励</span>
                        <span className="font-medium text-primary">
                          {userInfo.claimableRewards.stakingReward}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">质押占比</span>
                        <span className="font-medium">{myStakingData.stakingPower}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>质押进度</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

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
                        领取奖励 ({userInfo.claimableRewards.stakingReward})
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
              <h2 className="text-3xl font-bold mb-4">常见问题</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: '什么是质押？',
                  answer: '质押是指将您的 RWAT 代币锁定在智能合约中，以获得网络奖励和收益的过程。',
                },
                {
                  question: '质押有风险吗？',
                  answer:
                    '质押本身风险较低，但请注意市场波动风险和智能合约风险。我们建议分散投资。',
                },
                {
                  question: '如何计算收益？',
                  answer: '收益按照年化收益率（APY）计算，每日按比例分发到您的账户中。',
                },
                {
                  question: '可以提前取消质押吗？',
                  answer: '灵活质押可随时取消，锁定质押需要等待锁定期结束才能取出。',
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
