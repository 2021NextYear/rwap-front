import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Share2, Users, Gift, Trophy, Star, ExternalLink, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingShapes from '@/components/FloatingShapes'
import { useToast } from '@/hooks/use-toast'
import { useAccount } from 'wagmi'

const Referral = () => {
  const { address } = useAccount()
  const [referralCode, setReferralCode] = useState('RWAT2024')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const referralLink = useMemo(() => `${window.location.origin}?referral=${address}`, [address])

  const stats = [
    { label: '邀请人数', value: '156', icon: Users, reward: '+780 RWAT' },
    { label: '累计奖励', value: '2,340 RWAT', icon: Gift, reward: '+12.5%' },
    { label: '本月排名', value: '#23', icon: Trophy, reward: '前100名' },
    { label: '邀请等级', value: '钻石', icon: Star, reward: '20% 奖励' },
  ]

  const rewardTiers = [
    { level: '青铜', invites: '1-10', commission: '5%', bonus: '10 RWAT', color: 'bg-amber-500' },
    { level: '白银', invites: '11-50', commission: '10%', bonus: '50 RWAT', color: 'bg-gray-400' },
    {
      level: '黄金',
      invites: '51-100',
      commission: '15%',
      bonus: '150 RWAT',
      color: 'bg-yellow-500',
    },
    { level: '钻石', invites: '100+', commission: '20%', bonus: '500 RWAT', color: 'bg-blue-500' },
  ]

  const leaderboard = [
    { rank: 1, address: '0x1234...5678', invites: 1247, rewards: '62,350 RWAT', badge: '王者' },
    { rank: 2, address: '0x2345...6789', invites: 892, rewards: '44,600 RWAT', badge: '钻石' },
    { rank: 3, address: '0x3456...7890', invites: 634, rewards: '31,700 RWAT', badge: '钻石' },
    { rank: 4, address: '0x4567...8901', invites: 445, rewards: '22,250 RWAT', badge: '黄金' },
    { rank: 5, address: '0x5678...9012', invites: 321, rewards: '16,050 RWAT', badge: '黄金' },
  ]

  const myReferrals = [
    { address: '0x1111...2222', joinDate: '2024-01-15', status: '活跃', rewards: '125 RWAT' },
    { address: '0x3333...4444', joinDate: '2024-01-12', status: '活跃', rewards: '98 RWAT' },
    { address: '0x5555...6666', joinDate: '2024-01-08', status: '不活跃', rewards: '45 RWAT' },
    { address: '0x7777...8888', joinDate: '2024-01-05', status: '活跃', rewards: '203 RWAT' },
  ]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: '复制成功',
        description: '邀请链接已复制到剪贴板',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: '复制失败',
        description: '请手动复制链接',
        variant: 'destructive',
      })
    }
  }

  const shareOptions = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=加入 RWAT 生态系统，获得丰厚奖励！&url=${referralLink}`,
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: `https://t.me/share/url?url=${referralLink}&text=加入 RWAT 生态系统，获得丰厚奖励！`,
    },
    { name: 'Discord', icon: '🎮', url: referralLink },
    { name: '微信', icon: '💬', url: referralLink },
  ]

  return (
    <div className="relative min-h-screen">
      <FloatingShapes />
      <Header />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              邀请好友
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              邀请朋友加入 RWAT 生态，共同获得丰厚奖励
            </p>

            {/* Referral Link Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    我的邀请链接
                  </CardTitle>
                  <CardDescription>分享此链接，好友注册后您将获得奖励</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="font-mono text-sm" />
                    <Button onClick={() => copyToClipboard(referralLink)} className="flex-shrink-0">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {shareOptions.map(option => (
                      <Button
                        key={option.name}
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(option.url, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <span>{option.icon}</span>
                        {option.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rewards">奖励体系</TabsTrigger>
                <TabsTrigger value="leaderboard">排行榜</TabsTrigger>
                <TabsTrigger value="my-referrals">我的邀请</TabsTrigger>
              </TabsList>

              {/* Rewards System */}
              <TabsContent value="rewards" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">邀请奖励等级</h2>
                  <p className="text-muted-foreground">邀请越多，奖励越高！</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                          <div className="text-2xl font-bold text-primary mb-1">
                            {tier.commission}
                          </div>
                          <div className="text-sm text-muted-foreground">佣金比例</div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>等级奖励</span>
                            <span className="font-medium">{tier.bonus}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>状态</span>
                            <Badge variant={index === 3 ? 'default' : 'secondary'}>
                              {index === 3 ? '当前等级' : '未解锁'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Rules */}
                <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>邀请规则</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">奖励机制</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• 好友注册即获得 10 RWAT 奖励</li>
                          <li>• 好友首次质押获得 5% 佣金</li>
                          <li>• 好友挖矿收益 2% 永久佣金</li>
                          <li>• 达到等级要求获得等级奖励</li>
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
                </Card>
              </TabsContent>

              {/* Leaderboard */}
              <TabsContent value="leaderboard" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">邀请排行榜</h2>
                  <p className="text-muted-foreground">本月邀请达人榜单</p>
                </div>

                <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/40">
                            <th className="text-left p-4">排名</th>
                            <th className="text-left p-4">地址</th>
                            <th className="text-left p-4">邀请数</th>
                            <th className="text-left p-4">累计奖励</th>
                            <th className="text-left p-4">等级</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.map(user => (
                            <tr key={user.rank} className="border-b border-border/20">
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {user.rank <= 3 && (
                                    <Trophy
                                      className={`h-4 w-4 ${
                                        user.rank === 1
                                          ? 'text-yellow-500'
                                          : user.rank === 2
                                          ? 'text-gray-400'
                                          : 'text-amber-600'
                                      }`}
                                    />
                                  )}
                                  #{user.rank}
                                </div>
                              </td>
                              <td className="p-4 font-mono text-sm">{user.address}</td>
                              <td className="p-4 font-medium">{user.invites}</td>
                              <td className="p-4 text-primary">{user.rewards}</td>
                              <td className="p-4">
                                <Badge variant={user.rank <= 3 ? 'default' : 'secondary'}>
                                  {user.badge}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Referrals */}
              <TabsContent value="my-referrals" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">我的邀请记录</h2>
                  <p className="text-muted-foreground">查看您邀请的用户详情</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
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
                  </div>

                  <div>
                    <Card className="bg-gradient-card border-0 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>邀请统计</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">总邀请</span>
                            <span className="font-medium">156 人</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">活跃用户</span>
                            <span className="font-medium">142 人</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">本月新增</span>
                            <span className="font-medium">23 人</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">转化率</span>
                            <span className="font-medium">91.0%</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border/40">
                          <Button className="w-full" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            查看详细报告
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
