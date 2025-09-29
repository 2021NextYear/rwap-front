import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Lock, Unlock, TrendingUp, Clock, Coins, Trophy, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";

const Staking = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const stakingStats = [
    { label: "总质押量", value: "2.5M RWAI", icon: Lock, trend: "+12.5%" },
    { label: "年化收益率", value: "18.5%", icon: TrendingUp, trend: "+2.1%" },
    { label: "质押者数量", value: "8,234", icon: Wallet, trend: "+156" },
    { label: "总奖励发放", value: "450K RWAI", icon: Trophy, trend: "+8.2%" },
  ];

  const stakingPools = [
    {
      id: 1,
      name: "灵活质押",
      apy: "12%",
      lockPeriod: "无锁定期",
      minStake: "100 RWAI",
      totalStaked: "800K RWAI",
      description: "随时存取，灵活便捷",
      risk: "低",
    },
    {
      id: 2,
      name: "30天锁定",
      apy: "18%",
      lockPeriod: "30天",
      minStake: "500 RWAI",
      totalStaked: "1.2M RWAI",
      description: "短期锁定，稳定收益",
      risk: "低",
    },
    {
      id: 3,
      name: "90天锁定",
      apy: "25%",
      lockPeriod: "90天",
      minStake: "1000 RWAI",
      totalStaked: "500K RWAI",
      description: "中期锁定，高额回报",
      risk: "中",
    },
  ];

  const myStakingData = {
    totalStaked: "5,000 RWAI",
    totalRewards: "125.5 RWAI",
    pendingRewards: "8.2 RWAI",
    stakingPower: "0.2%",
  };

  return (
    <div className="relative min-h-screen">
      <FloatingShapes />
      <Header />
      
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              RWAI 质押
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              质押 RWAI 代币，获得稳定收益，参与网络治理
            </p>
            
            {/* Wallet Connection */}
            <div className="mb-12">
              {!isConnected ? (
                <Button 
                  size="lg" 
                  onClick={() => setIsConnected(true)}
                  className="text-lg px-8 py-4"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  连接钱包
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <Wallet className="mr-2 h-4 w-4" />
                    钱包已连接: 0x1234...5678
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 text-sm">
                    余额: 10,000 RWAI
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Staking Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stakingStats.map((stat, index) => {
                const Icon = stat.icon;
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
                );
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
                    <CardDescription>质押或取消质押您的 RWAI 代币</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="stake" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stake">质押</TabsTrigger>
                        <TabsTrigger value="unstake">取消质押</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="stake" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            质押数量
                          </label>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="输入要质押的 RWAI 数量"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                              className="pr-20"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setStakeAmount("10000")}
                            >
                              最大
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {["25%", "50%", "75%"].map((percent) => (
                            <Button
                              key={percent}
                              variant="outline"
                              size="sm"
                              onClick={() => setStakeAmount((10000 * parseInt(percent) / 100).toString())}
                            >
                              {percent}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>预估年收益</span>
                            <span className="text-primary">{stakeAmount ? (parseFloat(stakeAmount) * 0.18).toFixed(2) : "0"} RWAI</span>
                          </div>
                          <div className="flex justify-between">
                            <span>预估日收益</span>
                            <span className="text-primary">{stakeAmount ? (parseFloat(stakeAmount) * 0.18 / 365).toFixed(4) : "0"} RWAI</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          size="lg"
                          disabled={!isConnected || !stakeAmount}
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          {isConnected ? "质押 RWAI" : "请先连接钱包"}
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="unstake" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            取消质押数量
                          </label>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="输入要取消质押的 RWAI 数量"
                              value={unstakeAmount}
                              onChange={(e) => setUnstakeAmount(e.target.value)}
                              className="pr-20"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setUnstakeAmount("5000")}
                            >
                              最大
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-muted/20 rounded-lg border border-border/40">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4" />
                            解锁时间
                          </div>
                          <p className="text-sm">灵活质押可立即取出，锁定质押需等待解锁期结束</p>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          size="lg"
                          variant="outline"
                          disabled={!isConnected || !unstakeAmount}
                        >
                          <Unlock className="mr-2 h-4 w-4" />
                          {isConnected ? "取消质押" : "请先连接钱包"}
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
                    {isConnected ? (
                      <>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">总质押量</span>
                            <span className="font-medium">{myStakingData.totalStaked}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">累计奖励</span>
                            <span className="font-medium text-primary">{myStakingData.totalRewards}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">待领取奖励</span>
                            <span className="font-medium text-primary">{myStakingData.pendingRewards}</span>
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
                          <Button className="w-full" size="sm">
                            领取奖励 ({myStakingData.pendingRewards})
                          </Button>
                          <Button className="w-full" variant="outline" size="sm">
                            复投奖励
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>连接钱包查看质押信息</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Staking Pools */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">质押池</h2>
              <p className="text-muted-foreground">选择适合您的质押方案</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stakingPools.map((pool) => (
                <Card key={pool.id} className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pool.name}</CardTitle>
                      <Badge variant={pool.id === 2 ? "default" : "secondary"}>
                        {pool.id === 2 ? "推荐" : pool.risk}
                      </Badge>
                    </div>
                    <CardDescription>{pool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {pool.apy}
                      </div>
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
                    
                    <Button 
                      className="w-full" 
                      variant={pool.id === 2 ? "default" : "outline"}
                      disabled={!isConnected}
                    >
                      {pool.id === 2 ? "立即质押" : "选择此池"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">常见问题</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "什么是质押？",
                  answer: "质押是指将您的 RWAI 代币锁定在智能合约中，以获得网络奖励和收益的过程。"
                },
                {
                  question: "质押有风险吗？",
                  answer: "质押本身风险较低，但请注意市场波动风险和智能合约风险。我们建议分散投资。"
                },
                {
                  question: "如何计算收益？",
                  answer: "收益按照年化收益率（APY）计算，每日按比例分发到您的账户中。"
                },
                {
                  question: "可以提前取消质押吗？",
                  answer: "灵活质押可随时取消，锁定质押需要等待锁定期结束才能取出。"
                }
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
  );
};

export default Staking;