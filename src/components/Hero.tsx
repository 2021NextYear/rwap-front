import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import heroOrb from "@/assets/hero-orb.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              RWAFinance（RWAF）<span className="gradient-text">是由Exovo Ltd、Elias Neocleous & Co LLC</span>,{" "}
                <span className="gradient-text">塞浦路斯银行</span>,{" "}
                <span className="gradient-text">等众多知名权威机构</span>{" "}
                <span className="gradient-text">支持的国际供应链金融RWA产品。</span>
              </h1>
            </div>

            {/* <div className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>Backed by</span>
                  <div className="glass px-3 py-1 rounded-full">
                    <span className="gradient-text font-semibold">RWA</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Powered by</span>
                  <div className="glass px-3 py-1 rounded-full">
                    <span className="gradient-text font-semibold">Virtuals Protocol</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Preferred partner</span>
                  <div className="glass px-3 py-1 rounded-full">
                    <span className="gradient-text font-semibold">KAIRON</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground">Listed on</p>
                <div className="flex flex-wrap gap-4">
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="font-semibold">CoinMarketCap</span>
                  </div>
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="font-semibold">CoinGecko</span>
                  </div>
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="font-semibold">Uniswap</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="glass border-primary/20 hover:bg-primary/10 text-primary space-x-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Let me introduce myself</span>
              </Button>
            </div> */}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={heroOrb} 
                alt="RWAI AI Agent" 
                className="w-80 h-80 object-contain animate-float"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;