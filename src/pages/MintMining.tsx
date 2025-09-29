import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Wallet, Coins, Zap, TrendingUp, Users, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";

const MintMining = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);

  const stats = [
    { label: "总供应量", value: "10,000", icon: Coins },
    { label: "已挖出", value: "3,847", icon: TrendingUp },
    { label: "活跃矿工", value: "1,234", icon: Users },
    { label: "挖矿难度", value: "2.5x", icon: Zap },
  ];

  return (
    <div className="relative min-h-screen">
      <FloatingShapes />
      <Header />
      
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Mint & Mining
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              参与RWAI挖矿生态，铸造专属NFT，获取丰厚奖励
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
                  <Button 
                    variant="outline" 
                    onClick={() => setIsConnected(false)}
                  >
                    断开连接
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mining Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
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
                );
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
                    铸造 RWAI NFT
                  </CardTitle>
                  <CardDescription>
                    铸造专属NFT，开启挖矿之旅
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      铸造数量
                    </label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
                        disabled={!isConnected}
                      >
                        -
                      </Button>
                      <div className="flex-1 text-center py-2 px-4 border rounded-md">
                        {mintAmount}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}
                        disabled={!isConnected}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>单价</span>
                      <span>0.1 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gas费用</span>
                      <span>~0.005 ETH</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>总计</span>
                        <span>{(mintAmount * 0.1 + 0.005).toFixed(3)} ETH</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!isConnected}
                  >
                    {isConnected ? `铸造 ${mintAmount} 个 NFT` : "请先连接钱包"}
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
                  <CardDescription>
                    查看挖矿进度和收益
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isConnected ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">我的NFT</span>
                          <Badge>3 个</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">算力</span>
                          <span className="font-medium">150 TH/s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">今日收益</span>
                          <span className="font-medium text-primary">+12.5 RWAI</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>挖矿进度</span>
                          <span>67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          下次奖励: 2小时15分钟
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full" variant="secondary">
                          领取收益 (45.2 RWAI)
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>连接钱包查看挖矿数据</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mining Pools */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">挖矿池</h2>
              <p className="text-muted-foreground">选择合适的挖矿池，最大化收益</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "标准池", apy: "15%", difficulty: "低", fee: "2%" },
                { name: "高级池", apy: "25%", difficulty: "中", fee: "3%" },
                { name: "专业池", apy: "40%", difficulty: "高", fee: "5%" },
              ].map((pool, index) => (
                <Card key={index} className="bg-gradient-card border-0 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-center">{pool.name}</CardTitle>
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
                        <span>难度</span>
                        <Badge variant={index === 0 ? "secondary" : index === 1 ? "default" : "destructive"}>
                          {pool.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>手续费</span>
                        <span>{pool.fee}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                      {index === 1 ? "推荐" : "加入挖矿"}
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
  );
};

export default MintMining;