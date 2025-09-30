import { Twitter, MessageCircle, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "https://x.com/RWAFinacne" },
    { icon: MessageCircle, label: "Telegram", href: "https://t.me/rwafcoin" }
  ];

  const quickLinks = [
    // { label: "About", href: "#about" },
    // { label: "Timeline", href: "#timeline" },
    { label: "Dexscreener", href: "https://dexscreener.com/bsc/0x16eae557919fedc8bda162919cc72d2e1317346a" },
    { label: "AVE", href: "https://ave.ai/token/0x1e71525664b90393449494768a0120996d0be5b1-bsc?from=Home" }
  ];

  const resources = [
    { label: "Docs", href: "https://bitc.gitbook.io/bitconnect" },
    // { label: "Whitepaper", href: "#" },
    // { label: "API", href: "#" },
    { label: "Support", href: "https://bitc.gitbook.io/bitconnect/reesource/faq" }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold gradient-text">RWAF</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
            Through RWAF, investors can flexibly select investment opportunities tailored to their needs and risk tolerance.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:shadow-glow transition-smooth group"
                    aria-label={link.label}
                  >
                    <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold gradient-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold gradient-text mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="font-semibold gradient-text mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest updates and insights from RWAI.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-white text-sm">
                Subscribe
              </Button>
            </div>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2025 RWAFINANCE. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="https://bitc.gitbook.io/bitconnect" className="text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <a href="https://bitc.gitbook.io/bitconnect" className="text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </a>
              {/* <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                Cookie Policy
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;