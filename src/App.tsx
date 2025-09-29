import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import MintMining from './pages/MintMining'
import Staking from './pages/Staking'
import Referral from './pages/Referral'
import NotFound from './pages/NotFound'
import { wagmiConfig } from './constants'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { Updater } from './components/Updater'

const queryClient = new QueryClient()

const App = () => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Updater />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mint" element={<MintMining />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/referral" element={<Referral />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
)

export default App
