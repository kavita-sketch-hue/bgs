"use client"

import { 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Trash2, 
  ArrowUpRight,
  Info,
  ShoppingCart,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const STATS = [
  {
    title: "Total Dollars Saved",
    value: "$124,500",
    description: "Price of new assets avoided this year",
    icon: DollarSign,
    color: "text-primary",
    trend: "+12.5%",
  },
  {
    title: "CO₂ Avoided",
    value: "8,240 kg",
    description: "Manufacturing offset from reused items",
    icon: Leaf,
    color: "text-green-600",
    trend: "+8.2%",
  },
  {
    title: "Landfill Diversion",
    value: "1,120 kg",
    description: "Total weight of assets kept in use",
    icon: Trash2,
    color: "text-orange-600",
    trend: "+15.3%",
  },
]

export default function DashboardPage() {
  const handleSimulatePurchase = () => {
    toast("Smart Procurement Intercepted!", {
      description: "Wait! We have 3 'Dell UltraSharp 27\"' monitors in Storage Room B. Use those instead of buying new ones?",
      action: {
        label: "Use Internal",
        onClick: () => toast.success("Purchase cancelled. Asset claimed from Storage B."),
      },
      icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
      duration: 10000,
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Impact Dashboard</h1>
          <p className="text-muted-foreground">Real-time data on your organization's circularity progress.</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 font-bold border-primary text-primary hover:bg-primary/5"
          onClick={handleSimulatePurchase}
        >
          <ShoppingCart className="h-4 w-4" />
          Simulate New Purchase
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {STATS.map((stat) => (
          <Card key={stat.title} className="border-0 bg-secondary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span className="flex items-center text-green-600 mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {stat.trend}
                </span>
                {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-0 bg-secondary/50">
          <CardHeader>
            <CardTitle>Circularity Over Time</CardTitle>
            <CardDescription>
              Internal asset redistribution vs new purchases.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-end justify-between gap-2 px-8 pb-8">
            {[40, 25, 35, 30, 45, 60, 55, 70, 65, 80, 85, 90].map((height, i) => (
              <div 
                key={i} 
                className="w-full bg-primary/20 rounded-t-sm transition-all hover:bg-primary"
                style={{ height: `${height}%` }}
              />
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-0 bg-secondary/50">
          <CardHeader>
            <CardTitle>Top Categories by Impact</CardTitle>
            <CardDescription>
              Which assets are saving the most CO₂.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 pt-4">
              {[
                { name: "Laptops", impact: "4,200 kg CO₂", percent: 85 },
                { name: "Monitors", impact: "1,850 kg CO₂", percent: 65 },
                { name: "Chairs", impact: "1,120 kg CO₂", percent: 45 },
                { name: "Desks", impact: "840 kg CO₂", percent: 35 },
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.impact}</span>
                  </div>
                  <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="border-0 bg-primary/5 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Info className="h-6 w-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg">EcoLoop Protip</h3>
            <p className="text-muted-foreground">
              Offloading 10 high-end laptops to the Repair Loop instead of recycling them could save another $12,000 this month.
            </p>
          </div>
          <Button variant="default" className="font-semibold whitespace-nowrap">
            View Suggestions
          </Button>
        </Card>
      </div>
    </div>
  )
}
