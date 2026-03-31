"use client"

import { useState, useEffect } from "react"
import { 
  Sparkles, 
  Search, 
  Package, 
  ArrowRight, 
  Lightbulb,
  X,
  Plus
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CircularityAssistant() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = () => {
    if (query.toLowerCase().includes("intern")) {
      setResult({
        title: "Intern Setup Bundle",
        description: "We found 5 matching setups in internal inventory. No purchase needed!",
        items: [
          { name: "MacBook Pro 14\"", qty: 5, location: "IT Room B", icon: Package },
          { name: "Dell 27\" Monitor", qty: 5, location: "Storage A", icon: Package },
          { name: "Aeron Chair", qty: 5, location: "Warehouse 1", icon: Package },
        ],
        savings: "$12,400 Saved",
        co2: "850 kg Avoided"
      })
    } else {
      setResult(null)
    }
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full shadow-2xl flex items-center justify-center p-0 bg-primary hover:scale-110 transition-transform"
        >
          <Sparkles className="h-6 w-6 text-white" />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-0 bg-secondary shadow-2xl">
          <div className="p-6 pb-0">
            <div className="flex items-center gap-3 text-primary mb-4 p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Circularity Assistant</span>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">What can I help you find today?</DialogTitle>
              <DialogDescription>
                Search in plain English. e.g., "I need a setup for 5 new interns"
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 pt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Type your request here..." 
                className="h-14 pl-12 pr-24 text-lg border-0 bg-background shadow-inner"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button 
                className="absolute right-2 top-2 h-10 px-4 font-bold"
                onClick={handleSearch}
              >
                Ask AI
              </Button>
            </div>

            {result ? (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                       <Lightbulb className="h-5 w-5 text-primary" />
                       {result.title}
                    </h4>
                    <Badge variant="default" className="font-bold">
                       {result.savings}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                  
                  <div className="space-y-2">
                    {result.items.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{item.qty}x {item.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.location}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 font-bold h-11">
                      Process Bundle Claim
                    </Button>
                    <Button variant="outline" className="flex-1 h-11">
                      Save for Later
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pb-4">
                {[
                  "Setup for 5 interns",
                  "Repair Macbook Pro",
                  "Release furniture",
                  "Monthly reports"
                ].map((hint) => (
                  <button 
                    key={hint}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-background hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all text-sm text-muted-foreground text-left group"
                    onClick={() => { setQuery(hint); handleSearch(); }}
                  >
                    {hint}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
