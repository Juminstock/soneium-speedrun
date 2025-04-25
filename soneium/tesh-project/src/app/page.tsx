"use client"

import { useState, useEffect } from "react"
import { Coins, Twitter, DiscIcon as Discord, MessageCircle, LogOut, Loader2, ArrowDownUp } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Slider } from "@/app/components/ui/slider"
import { Switch } from "@/app/components/ui/switch"
import { Label } from "@/app/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import Image from "next/image"

export default function Home() {
  const [amount, setAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [hasStaked, setHasStaked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawProgress, setWithdrawProgress] = useState(0)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [totalSaved, setTotalSaved] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const walletAddress = "0x2b9...9055"

  // Animation on first load
  useEffect(() => {
    setPageLoaded(true)
  }, [])

  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    if (hasStaked) {
      setHasStaked(false)
    }
  }

  const handleStake = () => {
    if (amount && walletConnected) {
      setIsLoading(true)
      setProgress(0)

      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return prevProgress + 10
        })
      }, 200)

      // Simulate transaction completion
      setTimeout(() => {
        clearInterval(interval)
        setIsLoading(false)
        setHasStaked(true)
        setTotalSaved((prev) => prev + Number(amount))
      }, 2500)
    }
  }

  const handleWithdraw = () => {
    if (withdrawAmount && walletConnected && Number(withdrawAmount) <= totalSaved) {
      setIsWithdrawing(true)
      setWithdrawProgress(0)

      // Simulate loading progress
      const interval = setInterval(() => {
        setWithdrawProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return prevProgress + 10
        })
      }, 200)

      // Simulate transaction completion
      setTimeout(() => {
        clearInterval(interval)
        setIsWithdrawing(false)
        setTotalSaved((prev) => Math.max(0, prev - Number(withdrawAmount)))
        setWithdrawAmount("")

        // If all funds withdrawn, go back to staking view
        if (totalSaved - Number(withdrawAmount) <= 0) {
          setHasStaked(false)
        }
      }, 2500)
    }
  }

  const maxWithdraw = () => {
    setWithdrawAmount(totalSaved.toString())
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <Image src="/astar-logo.png" alt="Astar Logo" width={40} height={40} className="mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
              Astar Savings
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white hover:text-[#0075FF] transition">
              Inicio
            </a>
            <a href="#" className="text-white hover:text-[#0075FF] transition">
              Recompensas
            </a>
          </nav>
        </div>

        <div>
          {walletConnected ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#5928B1]/20 border border-[#5928B1] rounded-full pr-2 pl-1 py-1">
                <Avatar className="h-8 w-8 border-2 border-[#0075FF]">
                  <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`} />
                  <AvatarFallback className="bg-[#5928B1]">MX</AvatarFallback>
                </Avatar>
                <span className="text-sm text-white">{walletAddress}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDisconnectWallet}
                  className="text-white hover:text-red-500 hover:bg-red-500/10 h-6 w-6 rounded-full ml-1"
                >
                  <LogOut className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] hover:opacity-90 text-white"
            >
              Conecta tu cuenta
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`container mx-auto px-4 py-12 flex flex-col items-center transition-opacity duration-1000 ease-in-out ${
          pageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 max-w-2xl animate-fade-in">
          ¡Ahorra en{" "}
          <span className="bg-gradient-to-r from-[#006341] via-white to-[#CE1126] bg-clip-text text-transparent">
            $MXN
          </span>{" "}
          y gana recompensas todos los días!
        </h1>

        {isLoading ? (
          <div className="w-full max-w-md flex flex-col items-center justify-center p-8 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-[#0075FF] mb-4" />
            <h3 className="text-xl font-medium mb-4">Procesando tu ahorro...</h3>
            <Progress value={progress} className="w-full h-2 bg-[#5928B1]/20" />
            <p className="text-sm mt-2 text-white">Por favor espera mientras confirmamos tu transacción</p>
          </div>
        ) : isWithdrawing ? (
          <div className="w-full max-w-md flex flex-col items-center justify-center p-8 animate-fade-in">
            <Loader2 className="h-12 w-12 animate-spin text-[#E6007A] mb-4" />
            <h3 className="text-xl font-medium mb-4">Procesando tu retiro...</h3>
            <Progress value={withdrawProgress} className="w-full h-2 bg-[#5928B1]/20" />
            <p className="text-sm mt-2 text-white">Por favor espera mientras confirmamos tu transacción</p>
          </div>
        ) : hasStaked ? (
          /* Dashboard View */
          <div className="w-full max-w-3xl animate-fade-in">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#5928B1]/20">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="rewards">Recompensas</TabsTrigger>
                <TabsTrigger value="withdraw">Retirar</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#020617] border-[#5928B1]/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Balance Total</CardTitle>
                      <CardDescription className="text-white/70">Tu ahorro actual + recompensas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                        {(totalSaved * 1.001).toFixed(2)} $MXN
                      </div>
                      <p className="text-white/70 text-sm mt-1">+{((totalSaved * 0.1) / 365).toFixed(4)} $MXN (hoy)</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#020617] border-[#5928B1]/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">APY</CardTitle>
                      <CardDescription className="text-white/70">Porcentaje anual de rendimiento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#E6007A] to-[#5928B1] bg-clip-text text-transparent">
                        10%
                      </div>
                      <p className="text-white/70 text-sm mt-1">Tasa fija garantizada</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#020617] border-[#5928B1]/30 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Proyección de Recompensas</CardTitle>
                      <CardDescription className="text-white/70">Basado en tu ahorro actual</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="bg-[#5928B1]/10 p-3 rounded-lg">
                          <p className="text-white/70 text-xs">Diario</p>
                          <p className="text-lg font-medium text-white">{((totalSaved * 0.1) / 365).toFixed(4)} $MXN</p>
                        </div>
                        <div className="bg-[#5928B1]/10 p-3 rounded-lg">
                          <p className="text-white/70 text-xs">Mensual</p>
                          <p className="text-lg font-medium text-white">{((totalSaved * 0.1) / 12).toFixed(2)} $MXN</p>
                        </div>
                        <div className="bg-[#5928B1]/10 p-3 rounded-lg">
                          <p className="text-white/70 text-xs">Anual</p>
                          <p className="text-lg font-medium text-white">{(totalSaved * 0.1).toFixed(2)} $MXN</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => setHasStaked(false)}
                        className="w-full py-4 text-lg font-medium bg-gradient-to-r from-[#0047FF] to-[#00D1FF] hover:opacity-90 text-white"
                      >
                        Ahorrar más
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rewards">
                <Card className="bg-[#020617] border-[#5928B1]/30">
                  <CardHeader>
                    <CardTitle className="text-white">Historial de Recompensas</CardTitle>
                    <CardDescription className="text-white/70">Seguimiento de tus recompensas diarias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-[#5928B1]/10 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Recompensa diaria</p>
                          <p className="text-white/70 text-sm">Hoy, {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">+{((totalSaved * 0.1) / 365).toFixed(4)} $MXN</p>
                          <p className="text-white/70 text-xs">10% APY</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-[#5928B1]/10 rounded-lg opacity-70">
                        <div>
                          <p className="text-white font-medium">Recompensa diaria</p>
                          <p className="text-white/70 text-sm">
                            Pendiente, {new Date(Date.now() + 86400000).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">+{((totalSaved * 0.1) / 365).toFixed(4)} $MXN</p>
                          <p className="text-white/70 text-xs">10% APY</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-[#5928B1]/10 rounded-lg opacity-50">
                        <div>
                          <p className="text-white font-medium">Recompensa diaria</p>
                          <p className="text-white/70 text-sm">
                            Pendiente, {new Date(Date.now() + 172800000).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">+{((totalSaved * 0.1) / 365).toFixed(4)} $MXN</p>
                          <p className="text-white/70 text-xs">10% APY</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => setHasStaked(false)}
                      className="w-full py-4 text-lg font-medium bg-gradient-to-r from-[#0047FF] to-[#00D1FF] hover:opacity-90 text-white"
                    >
                      Ahorrar más
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw">
                <Card className="bg-[#020617] border-[#5928B1]/30">
                  <CardHeader>
                    <CardTitle className="text-white">Retirar Fondos</CardTitle>
                    <CardDescription className="text-white/70">Retira tus ahorros y recompensas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-[#5928B1]/10 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-white">Fondos disponibles</span>
                          <span className="text-white font-medium">{totalSaved.toFixed(2)} $MXN</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">Recompensas acumuladas</span>
                          <span className="text-white font-medium">+{(totalSaved * 0.001).toFixed(4)} $MXN</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label htmlFor="withdrawAmount" className="text-white">
                            Cantidad a retirar
                          </Label>
                          <Button variant="link" onClick={maxWithdraw} className="text-[#0075FF] p-0 h-auto">
                            MAX
                          </Button>
                        </div>

                        <div className="bg-[#5928B1]/10 rounded-xl p-4 flex items-center justify-between">
                          <Input
                            id="withdrawAmount"
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="0"
                            className="bg-transparent border-none text-2xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-white"
                          />
                          <div className="flex items-center bg-[#5928B1]/20 rounded-full px-3 py-1">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#006341] via-white to-[#CE1126] flex items-center justify-center">
                                <span className="text-xs font-bold text-white">$</span>
                              </div>
                              <span className="font-medium text-white">MXN</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Label className="text-white mb-2 block">Porcentaje a retirar</Label>
                          <Slider
                            defaultValue={[0]}
                            max={totalSaved}
                            step={1}
                            value={[withdrawAmount ? Number(withdrawAmount) : 0]}
                            onValueChange={(value: number[]) => setWithdrawAmount(value[0].toString())}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-white/70">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Switch id="fast-withdrawal" />
                          <Label htmlFor="fast-withdrawal" className="text-white">
                            Retiro rápido (+0.5% comisión)
                          </Label>
                        </div>
                        <div className="text-white/70 text-sm">
                          Retirar ahora mismo tardará 7 días en llegar
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > totalSaved}
                      className="w-full py-4 text-lg font-medium bg-gradient-to-r from-[#E6007A] to-[#5928B1] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    >
                      <ArrowDownUp className="mr-2 h-4 w-4" /> Retirar Fondos
                    </Button>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="link" className="text-white/70 hover:text-white">
                          Ver política de retiros
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#020617] border-[#5928B1]/30 text-white">
                        <DialogHeader>
                          <DialogTitle>Política de Retiros</DialogTitle>
                          <DialogDescription className="text-white/70">
                            Información importante sobre los retiros de fondos
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p>Los retiros estándar se procesan en 7 días.</p>
                          <p>Los retiros rápidos tienen una comisión del 0.5% y se procesan instantáneamente.</p>
                          <p>El monto mínimo de retiro es de 100 $MXN.</p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" className="border-[#5928B1] text-white" onClick={() => setIsDialogOpen(false)}>
                            Entendido
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* Staking Card */
          <div className="w-full max-w-md bg-[#020617]/80 border border-[#5928B1]/30 rounded-2xl p-1 shadow-lg animate-fade-in">
            <div className="rounded-2xl p-4">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">Cantidad a ahorrar</span>
                </div>
                <div className="bg-[#5928B1]/10 rounded-xl p-4 flex items-center justify-between">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="bg-transparent border-none text-2xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-white"
                  />
                  <div className="flex items-center bg-[#5928B1]/20 rounded-full px-3 py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#006341] via-white to-[#CE1126] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">$</span>
                      </div>
                      <span className="font-medium text-white">MXN</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">Recibirás (estimado)</span>
                </div>
                <div className="bg-[#5928B1]/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="text-2xl font-medium text-white">
                    {amount ? (Number.parseFloat(amount) * 1.1).toFixed(2) : "0"}
                  </div>
                  <div className="flex items-center bg-[#5928B1]/20 rounded-full px-3 py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E6007A] to-[#5928B1] flex items-center justify-center">
                        <Coins className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-medium text-white">MXN+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleStake}
                  disabled={!amount || !walletConnected}
                  className="w-full py-6 text-lg font-medium bg-gradient-to-r from-[#0047FF] to-[#00D1FF] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  ¡Ahorrar y ganar!
                </Button>

                <div className="text-center text-sm text-white mt-2">
                  Ahorra $MXN en Soneium Network y gana un 10% APY
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#5928B1]/20 pt-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Image src="/astar-logo.png" alt="Astar Logo" width={30} height={30} className="mr-2" />
            <span className="text-white">© 2025 Astar savings - University app.</span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://x.com/astarnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#0075FF] transition flex items-center gap-1"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Twitter</span>
            </a>
            <a
              href="https://discord.com/invite/astarnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#5928B1] transition flex items-center gap-1"
            >
              <Discord className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Discord</span>
            </a>
            <a
              href="https://t.me/AstarNetwork_ESP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#00D1FF] transition flex items-center gap-1"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
