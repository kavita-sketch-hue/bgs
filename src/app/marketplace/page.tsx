"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Package, Cpu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOCK_ASSETS = [
  {
    id: "1",
    name: "MacBook Pro 14\"",
    brand: "Apple",
    model: "M2 Pro, 16GB, 512GB",
    category: "Laptops",
    condition: "Good",
    location: "IT Storage - Floor 3",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    name: "Aeron Chair",
    brand: "Herman Miller",
    model: "Size B, Graphite",
    category: "Furniture",
    condition: "New",
    location: "Warehouse B",
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    name: "Dell UltraSharp 27\"",
    brand: "Dell",
    model: "U2723QE 4K",
    category: "Monitors",
    condition: "Fair",
    location: "Marketing Dept",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    name: "Standing Desk",
    brand: "Fully",
    model: "Jarvis Bamboo",
    category: "Furniture",
    condition: "Good",
    location: "Empty Office 402",
    imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "5",
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    model: "Gen 10, i7, 32GB",
    category: "Laptops",
    condition: "Good",
    location: "IT Storage - Floor 3",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "6",
    name: "iPad Pro 12.9\"",
    brand: "Apple",
    model: "M1, 256GB, WiFi",
    category: "Tablets",
    condition: "New",
    location: "Design Studio",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400",
  },
]

export default function MarketplacePage() {
  const [search, setSearch] = useState("")

  const filteredAssets = MOCK_ASSETS.filter(asset => 
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.brand.toLowerCase().includes(search.toLowerCase()) ||
    asset.model.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Internal Marketplace</h1>
          <p className="text-muted-foreground">Claim available assets for your team and help reduce waste.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-9 h-10 border-0 bg-secondary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden border-0 bg-secondary/50 transition-all hover:ring-1 hover:ring-primary">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={asset.imageUrl} 
                alt={asset.name} 
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="p-4 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <Badge variant={asset.condition === "New" ? "default" : "secondary"}>
                  {asset.condition}
                </Badge>
                <span className="text-xs text-muted-foreground">{asset.category}</span>
              </div>
              <CardTitle className="mt-2 text-lg line-clamp-1">{asset.name}</CardTitle>
              <CardDescription className="line-clamp-1">
                {asset.brand} • {asset.model}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-0 pb-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {asset.location}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full font-semibold" size="sm">
                Claim Asset
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <Package className="h-12 w-12 text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-semibold">No assets found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}
