import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Coins, Zap, TrendingUp, Users, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingShapes from '@/components/FloatingShapes'
import {
  getRwatContract,
  gt,
  number2Big,
  rwatInterface,
  sanitizeInput,
  sendTransaction,
  stakeMiningInterface,
  times,
  toFixed,
} from '@/lib'
import { CHAIN_CONFIG } from '@/constants'
import { collectReward, genErc20ApproveForContract, getReferral, getUserInfo } from '@/utils'
import { useAccount } from 'wagmi'
import { Input } from '@/components/ui/input'
import { useBalance } from '@/hooks/useBalance'
import { useGlobalInfo, useTokenAmountByStake, useUserInfo } from '@/hooks/useContract'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/Button'
import { Progress } from '@/components/ui/progress'
import { useTranslation } from 'react-i18next'

const MintMining = () => {
  const { toast } = useToast()
  const { t } = useTranslation()

  const { USDT } = useBalance()
  const { miningClaimedRewards, miningAddresses, superNodeCount, ordinaryNodeCount } =
    useGlobalInfo()
  const totalSupply = useTokenAmountByStake()
  const chainId = CHAIN_CONFIG.chainId
  const { rwat, staking, usdt } = CHAIN_CONFIG.contract
  const { address } = useAccount()
  const [mintAmount, setMintAmount] = useState('100')
  const [miningLoading, setMiningLoading] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)
  const [collectLoading, setCollectLoading] = useState(false)

  const userInfo = useUserInfo()

  const stats = [
    { label: t('mint.stats.totalSupply'), value: totalSupply, icon: Coins },
    {
      label: t('mint.stats.mined'),
      value: miningClaimedRewards,
      icon: TrendingUp,
    },
    {
      label: t('mint.stats.activeMiners'),
      value: miningAddresses,
      icon: Users,
    },
    { label: t('mint.stats.nodes'), value: ordinaryNodeCount, icon: Zap },
    { label: t('mint.stats.superNodes'), value: superNodeCount, icon: Zap },
  ]

  const setStaking = async () => {
    const rwatContract = getRwatContract(rwat, chainId)
    const calldata = rwatInterface.encodeFunctionData('setStakingContractAddress', [staking])
    await sendTransaction({ to: rwat, data: calldata, value: '0' }, chainId)
  }

  const setDexpair = async () => {
    const rwatContract = getRwatContract(rwat, chainId)
    const calldata = rwatInterface.encodeFunctionData('setDexPair', [
      '0x16eaE557919fedC8Bda162919cc72D2e1317346a',
      true,
    ])
    await sendTransaction({ to: rwat, data: calldata, value: '0' }, chainId)
  }

  const mining = async () => {
    try {
      const _amount = number2Big(mintAmount, 18)
      const erc20Approve = await genErc20ApproveForContract(
        usdt,
        staking,
        address,
        _amount,
        chainId
      )
      if (erc20Approve) {
        setApproveLoading(true)
        await sendTransaction(erc20Approve, chainId)
      }

      const calldata = stakeMiningInterface.encodeFunctionData('mining', [_amount, getReferral()])
      setMiningLoading(true)
      await sendTransaction({ to: staking, data: calldata, value: '0' }, chainId)
      toast({ title: t('common.toast.claim.success') })
    } catch (error) {
      toast({ title: t('common.toast.claim.fail') })
    }
    setApproveLoading(false)
    setMiningLoading(false)
  }

  const collect = async () => {
    try {
      setCollectLoading(true)
      await collectReward('claimMiningRewards')
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
        {/* <div className="">
          <div className="" onClick={setStaking}>
            set staking
          </div>
          <div className="" onClick={setDexpair}>
            set pair
          </div>
        </div> */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {t('mint.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('mint.subtitle')}
            </p>
          </div>
        </section>

        {/* Mining Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mint Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mint Interface */}
              <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    {t('mint.card.title')}
                  </CardTitle>
                  <CardDescription>{t('mint.card.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('mint.subscribe.label')}
                    </label>
                    <div className="p-6 rounded-md border border-ring-ring">
                      <input
                        value={mintAmount}
                        className="w-full text-xl outline-none border-none bg-transparent"
                        type="text"
                        onChange={e => setMintAmount(sanitizeInput(e.target.value, 6, false))}
                      />

                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-end text-sm">
                          <span className="mr-1">{t('common.balance')}:</span>
                          <span className="flex items-center">
                            {USDT}
                            <img
                              src="https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
                              alt=""
                              className="size-4 rounded-full mx-1"
                            />{' '}
                            USDT
                          </span>
                          <div
                            className="ml-4"
                            onClick={() => {
                              setMintAmount(toFixed(USDT, 6))
                            }}
                          >
                            {t('common.max')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={mining}
                    loading={miningLoading}
                    disabled={
                      miningLoading ||
                      gt(100, USDT || 0) ||
                      !Number(mintAmount) ||
                      gt(mintAmount, USDT)
                    }
                  >
                    {t(approveLoading ? 'mint.approve' : 'mint.subscribe.cta')}
                  </Button>
                </CardContent>
              </Card>

              {/* Mining Dashboard */}
              <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {t('mint.my.title')}
                  </CardTitle>
                  <CardDescription>{t('mint.my.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('mint.my.amount')}</span>
                      <Badge>{userInfo.totalMiningAmount} USDT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('mint.my.hashrate')}</span>
                      <span className="font-medium">
                        {times(Number(userInfo.totalMiningAmount) || 0, 5, 4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('mint.my.rewards')}</span>
                      <span className="font-medium text-primary">
                        +{userInfo.claimedRewards.miningReward} RWAF
                      </span>
                    </div>
                  </div>
                  {/* 
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>挖矿进度</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div> */}

                  <div className="pt-4 border-t">
                    <Button
                      className="w-full"
                      onClick={collect}
                      disabled={
                        collectLoading || Number(userInfo.claimableRewards.miningReward) === 0
                      }
                      loading={collectLoading}
                    >
                      {t('mint.claim.cta')} ({userInfo.claimableRewards.miningReward} RWAF)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mining Pools */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('mint.pools.title')}</h2>
              {/* <p className="text-muted-foreground">节点数据展示，超级节点享受手续费分红</p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: t('mint.pools.roles.miner'),
                  apy: '91.25%',
                  difficulty: t('mint.pools.difficulty'),
                  fee: '0%',
                },
                {
                  name: t('mint.pools.roles.node'),
                  apy: '109.5%',
                  difficulty: t('mint.pools.difficulty'),
                  fee: '40%',
                },
                {
                  name: t('mint.pools.roles.superNode'),
                  apy: '127.75%',
                  difficulty: t('mint.pools.difficulty'),
                  fee: '60%',
                },
              ].map((pool, index) => (
                <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-center">{pool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{pool.apy}</div>
                      <div className="text-sm text-muted-foreground">{t('mint.pools.apy')}</div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{t('mint.pools.difficulty')}</span>
                        <Badge
                          variant={
                            index === 0 ? 'secondary' : index === 1 ? 'default' : 'destructive'
                          }
                        >
                          {pool.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('mint.pools.feeDividend')}</span>
                        <span>{pool.fee}</span>
                      </div>
                    </div>

                    {/* <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                      {index === 1 ? '推荐' : '加入挖矿'}
                    </Button> */}
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

export default MintMining
