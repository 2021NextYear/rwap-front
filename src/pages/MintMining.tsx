import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Wallet, Coins, Zap, TrendingUp, Users, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingShapes from '@/components/FloatingShapes'
import {
  getRwatContract,
  getStakeMiningContract,
  number2Big,
  rwatInterface,
  sanitizeInput,
  sendTransaction,
  stakeMiningInterface,
} from '@/lib'
import { CHAIN_CONFIG } from '@/constants'
import { genErc20ApproveForContract, getReferral, getUserInfo } from '@/utils'
import { useAccount } from 'wagmi'
import { zeroAddress } from 'viem'
import { Input } from '@/components/ui/input'
import { useBalance } from '@/hooks/useBalance'

const MintMining = () => {
  const { USDT } = useBalance()
  const chainId = CHAIN_CONFIG.chainId
  const { rwat, staking, usdt } = CHAIN_CONFIG.contract
  const { address } = useAccount()
  const [mintAmount, setMintAmount] = useState('100')

  const [userInfo, setUserInfo] = useState({
    directInviter: '',
    directInviteCount: '0',
    totalMiningAmount: '0',
    totalStakingAmount: '0',
    claimableRewards: {
      miningReward: '0',
      stakingReward: '0',
      inviteReward: '0',
      dividendReward: '0',
    },
    claimedRewards: {
      miningReward: '0',
      stakingReward: '0',
      inviteReward: '0',
      dividendReward: '0',
    },
  })

  const stats = [
    { label: '总供应量', value: '10,000', icon: Coins },
    { label: '已挖出', value: '3,847', icon: TrendingUp },
    { label: '活跃矿工', value: '1,234', icon: Users },
    { label: '挖矿难度', value: '2.5x', icon: Zap },
  ]

  const setStaking = async () => {
    const rwatContract = getRwatContract(rwat, chainId)
    const calldata = rwatInterface.encodeFunctionData('setStakingContractAddress', [staking])
    await sendTransaction({ to: rwat, data: calldata, value: '0' }, chainId)
  }

  const setDexpair = async () => {
    const rwatContract = getRwatContract(rwat, chainId)
    const calldata = rwatInterface.encodeFunctionData('setDexPair', [
      '0xc7bb02fb86605d6d7be7c407fb464ff5a6c300fc',
      true,
    ])
    await sendTransaction({ to: rwat, data: calldata, value: '0' }, chainId)
  }

  const mining = async () => {
    const _amount = number2Big(mintAmount, 18)
    const erc20Approve = await genErc20ApproveForContract(usdt, staking, address, _amount, chainId)
    if (erc20Approve) {
      await sendTransaction(erc20Approve, chainId)
    }

    const calldata = stakeMiningInterface.encodeFunctionData('mining', [_amount, getReferral()])

    await sendTransaction({ to: staking, data: calldata, value: '0' }, chainId)

    fetchUserInfo()
  }

  const fetchUserInfo = async () => {
    const info = await getUserInfo(address)
    setUserInfo(info)
  }

  useEffect(() => {
    address && fetchUserInfo()
  }, [address])

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
              Mint & Mining
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              参与RWAT挖矿生态，铸造专属NFT，获取丰厚奖励
            </p>
          </div>
        </section>

        {/* Mining Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                    RWAT
                  </CardTitle>
                  <CardDescription>认购RWAT，开启挖矿之旅</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">认购</label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={mintAmount}
                        onChange={e => setMintAmount(sanitizeInput(e.target.value, 6, false))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>余额</span>
                      <span>{USDT} USDT</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={mining}>
                    认购
                  </Button>
                </CardContent>
              </Card>

              {/* Mining Dashboard */}
              <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    我的挖矿
                  </CardTitle>
                  <CardDescription>查看挖矿进度和收益</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">认购金额</span>
                      <Badge>{userInfo.totalMiningAmount} USDT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">算力</span>
                      <span className="font-medium">150 TH/s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">今日收益</span>
                      <span className="font-medium text-primary">+12.5 RWAT</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>挖矿进度</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" variant="secondary">
                      领取收益 ({userInfo.claimableRewards.miningReward} RWAT)
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
              <h2 className="text-3xl font-bold mb-4">节点分布</h2>
              <p className="text-muted-foreground">节点数据展示，超级节点享受手续费分红</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: '普通用户', apy: '15%', difficulty: '低', fee: '0%' },
                { name: '节点', apy: '25%', difficulty: '中', fee: '40%' },
                { name: '超级节点', apy: '40%', difficulty: '高', fee: '60%' },
              ].map((pool, index) => (
                <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-center">{pool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{pool.apy}</div>
                      <div className="text-sm text-muted-foreground">年化收益率</div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>难度</span>
                        <Badge
                          variant={
                            index === 0 ? 'secondary' : index === 1 ? 'default' : 'destructive'
                          }
                        >
                          {pool.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>手续费</span>
                        <span>{pool.fee}</span>
                      </div>
                    </div>

                    <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                      {index === 1 ? '推荐' : '加入挖矿'}
                    </Button>
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
