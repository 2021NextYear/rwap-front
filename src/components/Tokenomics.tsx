import { PieChart, TrendingUp, Users, Lock } from "lucide-react";

const Tokenomics = () => {
  const distribution = [
    {
      category: "Public Sale",
      percentage: 90,
      color: "from-violet-500 to-purple-500",
      icon: Users,
      description: "Available for community purchase and Minging"
    },
    {
      category: "Liquidity",
      percentage: 1,
      color: "from-blue-500 to-cyan-500", 
      icon: TrendingUp,
      description: "DEX liquidity provision"
    },
    {
      category: "Satking",
      percentage: 4,
      color: "from-emerald-500 to-teal-500",
      icon: Lock,
      description: "Vested over 2000 days"
    },
    {
      category: "Node award ",
      percentage: 5,
      color: "from-orange-500 to-red-500",
      icon: PieChart,
      description: "Platform development & operations"
    }
  ];

  const stats = [
    { label: "Total Supply", value: "1,000,000,000", unit: "RWAF" },
    { label: "Liquity Supply", value: "100,000", unit: "RWAF" },
    { label: "Market Cap", value: "$2.5M", unit: "USD" },
    { label: "Holders", value: "15,420", unit: "+" }
  ];

  return (
    <section id="tokenomics" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Tokenomics</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent and sustainable token distribution designed for long-term growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Token Distribution */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold gradient-text">Token Distribution</h3>
            
            <div className="space-y-4">
              {distribution.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="glass rounded-xl p-4 hover:shadow-glow transition-smooth">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">{item.category}</span>
                      </div>
                      <span className="text-xl font-bold gradient-text">{item.percentage}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">{item.description}</p>
                    
                    {/* Progress bar */}
                    <div className="mt-3 ml-11">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Chart Placeholder */}
          <div className="flex justify-center">
            <div className="glass rounded-3xl p-8 w-80 h-80 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Animated circles representing pie chart */}
                <div className="absolute inset-0 rounded-full border-8 border-violet-500/30"></div>
                <div className="absolute inset-2 rounded-full border-8 border-blue-500/30"></div>
                <div className="absolute inset-4 rounded-full border-8 border-emerald-500/30"></div>
                <div className="absolute inset-6 rounded-full border-8 border-orange-500/30 animate-pulse"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">RWAF</div>
                    <div className="text-sm text-muted-foreground">Token</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center hover:shadow-glow transition-smooth">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;